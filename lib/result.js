var listeners = [];

// register schedule change listener
function registerScheduleChangeListener(listener) {
  listeners.push(listener);
}

// write the schedule to local disk
function write(line, schedule) {
  fireScheduleChange(line, schedule);
}

// fire schedule update event
function fireScheduleChange(line, schedule) {
  for (var i = 0; i < listeners.length; i++) {
    listeners[i](line, schedule);
  }
}


// export
module.exports.registerScheduleChangeListener = registerScheduleChangeListener;
module.exports.write = write;
