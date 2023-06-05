$(function(){
    CallInit();
});

function CallInit(){
    LogDebug('Sentry Initialized');
}


function LogError(message){
    Sentry.captureMessage(message, "error");
}

function LogInfo(info){
    Sentry.captureMessage(info, "info");
}

function LogDebug(debug){
    Sentry.captureMessage(debug, "debug");
}

function LogFatal(fatal){
    Sentry.captureMessage(fatal, "fatal");
}

function LogWarning(warning){
    Sentry.captureMessage(warning, "warning");
}