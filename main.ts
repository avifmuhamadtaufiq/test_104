function init_esp8266 () {
    esp8266.init(SerialPin.P13, SerialPin.P14, BaudRate.BaudRate115200)
    if (esp8266.isESP8266Initialized()) {
    	
    }
}
datalogger.onLogFull(function () {
    logging = false
    basic.showIcon(IconNames.Skull)
})
function init_dht22 () {
    dht11_dht22.queryData(
    DHTtype.DHT22,
    DigitalPin.P0,
    false,
    false,
    false
    )
}
input.onButtonPressed(Button.A, function () {
    logging = !(logging)
    if (logging) {
        basic.showIcon(IconNames.Heart)
    } else {
        basic.clearScreen()
    }
})
input.onButtonPressed(Button.AB, function () {
    if (input.logoIsPressed()) {
        logging = false
        datalogger.deleteLog(datalogger.DeleteType.Full)
        basic.showIcon(IconNames.Yes)
    }
})
function init_ds3231 () {
    esp8266.updateInternetTime()
    if (esp8266.isInternetTimeUpdated()) {
        DS3231.dateTime(
        esp8266.getYear(),
        esp8266.getMonth(),
        esp8266.getWeekday(),
        esp8266.getDay(),
        esp8266.getHour(),
        esp8266.getMinute(),
        esp8266.getSecond()
        )
        led.plot(3, 0)
    }
}
function init_internet_time () {
    esp8266.initInternetTime(7)
    if (esp8266.isInternetTimeInitialized()) {
        led.plot(2, 0)
    }
}
function init_wifi () {
    esp8266.connectWiFi("OFF", "wordwide444")
    if (esp8266.isWifiConnected()) {
        led.plot(1, 0)
    }
}
let temprature = 0
let logging = false
logging = false
datalogger.setColumnTitles(
"time",
"temprature"
)
init_esp8266()
init_wifi()
init_internet_time()
init_ds3231()
basic.pause(5000)
loops.everyInterval(1000, function () {
    if (logging) {
        init_dht22()
        if (dht11_dht22.readDataSuccessful()) {
            temprature = dht11_dht22.readData(dataType.temperature)
        }
        datalogger.log(
        datalogger.createCV("time", "" + DS3231.hour() + ":" + DS3231.minute() + ":" + DS3231.second()),
        datalogger.createCV("temprature", temprature)
        )
    }
})
