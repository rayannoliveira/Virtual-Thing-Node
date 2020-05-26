WoT.produce({
    title: "MyLampLed",
    description: "A Thing to control the LED",
    properties: {
        on: {
            type: "boolean",
            description: "My Lamp led onOff",
            observable: true,
            readOnly: true
        }
    },
    actions: {
        toggle: {
            description:"current status of the lamp(on|off)"
            }
        },
    events: {
        overheat: {
            description: "Alert sent when the Led temperature is too high"
        }
    },
})
    .then(function (thing) {
    console.log("Produced " + thing.getThingDescription().title);
    // init property values
    thing.writeProperty("on", getOn());

    thing.setPropertyReadHandler("on",function(){
        return new Promise((resolve, reject) => {
            resolve(getOn());
        });
    });

    // set action handlers
    thing.setActionHandler("toggle", function (value, options) {
        changeLedStatus(value)
    });

    // expose the thing
    thing.expose().then(function () { console.info(thing.getThingDescription().title + " ready"); });

    function getOn() {
        // normally, you would call the temperature sensor's function to read the actual temperature value
        // return new Promise((resolve, reject) => {
            var ledstatus=true;
            return ledstatus;
            
            // resolve(5); //uncomment to test incrementing etc.
        //  });
    }

    function changeLedStatus(newValue){
        // normally, you would do physical action to change the temperature
        //do nothing
        thing.writeProperty("on",newValue);
        return;
    }
})
    .catch(function (e) {
    console.log(e);
});