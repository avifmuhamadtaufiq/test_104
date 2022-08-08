function init_esp8266 () {
    esp8266.init(SerialPin.P13, SerialPin.P14, BaudRate.BaudRate115200)
    if (esp8266.isESP8266Initialized()) {
        OLED.writeStringNewLine("init esp8266 success")
    } else {
        OLED.writeStringNewLine("init esp8266 error")
    }
}
function init_ds3231 () {
    esp8266.updateInternetTime()
    if (esp8266.isInternetTimeUpdated()) {
        OLED.writeStringNewLine("init ds3231")
        DS3231.dateTime(
        esp8266.getYear(),
        esp8266.getMonth(),
        esp8266.getWeekday(),
        esp8266.getDay(),
        esp8266.getHour(),
        esp8266.getMinute(),
        esp8266.getSecond()
        )
    } else {
        OLED.writeStringNewLine("error time")
    }
    basic.pause(1000)
}
function init_oled () {
    OLED.init(128, 64)
}
function init_internet_time () {
    esp8266.initInternetTime(7)
    if (esp8266.isInternetTimeInitialized()) {
        OLED.writeStringNewLine("init time success")
    } else {
        OLED.writeStringNewLine("init time error")
    }
}
function init_wifi () {
    esp8266.connectWiFi("OFF", "wordwide444")
    if (esp8266.isWifiConnected()) {
        OLED.writeStringNewLine("wifi connected")
    } else {
        OLED.writeStringNewLine("wifi disconnected")
    }
}
init_oled()
basic.pause(2000)
OLED.clear()
init_esp8266()
basic.pause(2000)
OLED.clear()
init_wifi()
basic.pause(2000)
OLED.clear()
init_internet_time()
basic.pause(2000)
OLED.clear()
init_ds3231()
basic.pause(2000)
OLED.clear()
basic.forever(function () {
    OLED.clear()
    OLED.writeStringNewLine("" + DS3231.hour() + ":" + DS3231.minute() + ":" + DS3231.second())
    basic.pause(1000)
})
