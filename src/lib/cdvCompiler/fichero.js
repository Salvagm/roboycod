/**
 * Created by salva on 21/08/15.
 */
postMessage("I\'m working before postMessage(\'ali\').");

onmessage = function (oEvent) {
    postMessage("Hi " + oEvent.data);
};