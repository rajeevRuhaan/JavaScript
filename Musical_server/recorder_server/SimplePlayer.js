/*

Copyright 2020 Nicolò Andronio

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and
associated documentation files (the "Software"), to deal in the Software without restriction,
including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense,
and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so,
subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial
portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT
NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

https://www.andronio.me/2019/04/24/easily-play-a-song-track-in-javascript-using-tone-js-transport/
*/

class SimplePlayer {
    constructor () {
        this.synth = new Tone.Synth().toMaster();
    }

    /**
     * If the given event has new tempo and/or time signatures, apply them to the Transport immediately.
     * @param {SequenceEvent} event
     * @param {boolean} ramp If true, tempo will ramp up/down to the given value over 1 second,
     *     otherwise it will change instantly.
     */
    applyEventUpdates (event, ramp) {
        if (event.newTempo && event.newTempo.unit === 'bpm') {
            if (ramp) {
                Tone.Transport.bpm.rampTo(event.newTempo.value, 1);
            } else {
                Tone.Transport.bpm.value = event.newTempo.value;
            }
        }

        if (event.newTimeSignature) {
            Tone.Transport.timeSignature = [
                event.newTimeSignature.numerator,
                event.newTimeSignature.denominator
            ];
        }
    }

    /**
     * Use Tone.js Transport to play a series of notes encoded by the event list passed in input,
     * using the default ugly synthetic membrane sound.
     * @param {SequenceEvent[]} track
     */
    play (track) {
        const synth = this.synth;

        // We will use the Transport to schedule each measure independently. Given that we
        // inform Tone.js of the current tempo and time signature, the Transport will be
        // able to automatically interpret all measures and note durations as absolute
        // time events in seconds without us actually bothering
        let measureCounter = 0;
        let firstEvent = true;

        // Stop, rewind and clear all events from the transport (from previous plays)
        Tone.Transport.stop();
        Tone.Transport.position = 0;
        Tone.Transport.cancel();

        for (const event of track) {
            // The first event is always supposed to have new tempo and time signature info
            // so we should update the Transport appropriately
            if (firstEvent) {
                this.applyEventUpdates(event, false);
                firstEvent = false;
            }

            // In the following callback, "time" represents the absolute time in seconds
            // that the measure we are scheduling is expected to begin at, given the current
            // tempo and time signature assigned to the Transport
            Tone.Transport.schedule((time) => {
                // Change the tempo if this event has a new tempo. Also do the same if a new time signatue is issued
                this.applyEventUpdates(event, true);

                // This contains the relative time of notes with respect to the
                // start of the current measure, in seconds
                let relativeTime = 0;

                for (const note of event.measure.notes) {
                    const duration = note.duration;

                    // If this is an actual note (as opposed to a rest), schedule the
                    // corresponding sound to be played along the Transport timeline
                    // after the previous notes in the measure have been played (hence the relativeTime)
                    if (note.type === 'note') {
                        synth.triggerAttackRelease(note.name, note.duration, time + relativeTime);
                    }

                    // This is used to delay notes that come next by the correct amount
                    relativeTime += Tone.Time(duration).toSeconds();

                }
            }, `${measureCounter}m`);

            measureCounter++;
        }

        Tone.Transport.start();
    }
}

class SequenceParser {
    constructor (tempoBpm, timeSignatureArray) {
        this.initialTempo = { value: tempoBpm, unit: 'bpm' };
        this.initialTimeSignature = { numerator: timeSignatureArray[0], denominator: timeSignatureArray[1] };
    }

    parse (textMeasures) {
        const result = [];
        let firstEvent = true;

        for (const textMeasure of textMeasures) {
            const event = { };

            if (firstEvent) {
                event.newTempo = this.initialTempo;
                event.newTimeSignature = this.initialTimeSignature;
                firstEvent = false;
            }

            event.measure = this.parseTextMeasure(textMeasure);
            result.push(event);
        }

        return result;
    }

    parseTextMeasure (textMeasure) {
        const notes = textMeasure.split(' ')
            .filter(textNote => !!textNote)
            .map(textNote => this.parseTextNote(textNote));

        return { notes };
    }

    parseTextNote (textNote) {
        const chunks = textNote.split('/');
        const isNote = (chunks[0] !== 'rest');
        return {
            type: isNote ? 'note' : 'rest',
            name: isNote ? chunks[0] : null,
            duration: chunks[1] + 'n'
        };
    }
}