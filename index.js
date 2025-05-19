const Alexa = require('ask-sdk-core');

const AUDIO_URL = 'https://d2i5glzz4vj4f9.cloudfront.net/brown-noise.mp3';

const PlayNoiseIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest' &&
               handlerInput.requestEnvelope.request.intent.name === 'PlayNoiseIntent';
    },
    handle(handlerInput) {
        return handlerInput.responseBuilder
            .speak("Playing brown noise.")
            .addAudioPlayerPlayDirective('REPLACE_ALL', AUDIO_URL, AUDIO_URL, 0, null)
            .getResponse();
    }
};

const AudioPlayerEventHandler = {
    canHandle(handlerInput) {
        const requestType = Alexa.getRequestType(handlerInput.requestEnvelope);
        return requestType.startsWith('AudioPlayer.');
    },
    handle(handlerInput) {
        if (handlerInput.requestEnvelope.request.type === 'AudioPlayer.PlaybackFinished') {
            return handlerInput.responseBuilder
                .addAudioPlayerPlayDirective('REPLACE_ALL', AUDIO_URL, AUDIO_URL, 0, null)
                .getResponse();
        }
        return handlerInput.responseBuilder.getResponse();
    }
};

const StopIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest' &&
               handlerInput.requestEnvelope.request.intent.name === 'AMAZON.StopIntent';
    },
    handle(handlerInput) {
        return handlerInput.responseBuilder
            .addAudioPlayerStopDirective()
            .getResponse();
    }
};

const ErrorHandler = {
    canHandle() {
        return true;
    },
    handle(handlerInput, error) {
        console.log(`Error handled: ${error.message}`);
        return handlerInput.responseBuilder
            .speak('Sorry, something went wrong.')
            .getResponse();
    }
};

exports.handler = Alexa.SkillBuilders.custom()
    .addRequestHandlers(
        PlayNoiseIntentHandler,
        AudioPlayerEventHandler,
        StopIntentHandler
    )
    .addErrorHandlers(ErrorHandler)
    .lambda();