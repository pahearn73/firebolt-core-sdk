const win = globalThis || window

if (!win.__firebolt) {
    win.__firebolt = {}
}

let sendCallback
let receiveCallback
let first = false
let _history = []

const transport = {
    send: function(message) {
        const json = JSON.parse(message)
        _history.push(json)
        sendCallback && sendCallback(json)
    },
    response: function(json) {
        receiveCallback(JSON.stringify(json))
    },
    receive: function(callback) {
        // store the callback
        receiveCallback = callback
    },
    onSend: function(callback) {
        sendCallback = callback
    },
    history() {
        return _history.concat()
    },
    instantiatedBeforeSdk() {
        return first
    }
}

if (!win.__firebolt.setTransportLayer) {
    first = true
}

win.__firebolt.getTransportLayer = function() {
    // we'll assert on this later...
    return transport
}

export default transport