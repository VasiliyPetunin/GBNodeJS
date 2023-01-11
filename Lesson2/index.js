import moment from "moment";
import EventEmitter from 'events';

const emitter = new class extends EventEmitter {};
const dateTimesDeadline = process.argv.slice(2);

emitter.on('setTimer', (initialDateTime) => {
    const intervalObj = setInterval(() => {
        let dateTime = initialDateTime;
        let differenceInMs = dateTime - new Date();
        dateTime = new moment.duration(differenceInMs);

        let days = Math.floor(dateTime.asDays());
        differenceInMs = differenceInMs - days * 8.64e7;
        dateTime = new moment.duration(differenceInMs); 

        let hours = Math.floor(dateTime.asHours());
        differenceInMs = differenceInMs - hours * 3.6e6;
        dateTime = new moment.duration(differenceInMs);

        let minutes = Math.floor(dateTime.asMinutes());
        differenceInMs = differenceInMs - minutes * 60000;
        dateTime = new moment.duration(differenceInMs);

        let seconds = Math.floor(dateTime.asSeconds());

        if (days >= 0 && hours >= 0 && minutes >= 0 && seconds >= 0) {
            console.log(`${seconds} seconds ${minutes} minutes ${hours} hours ${days} days left`)
        }   else {
            clearInterval(intervalObj);
            console.log('Timer\'s gone!');
        }
    }, 1000)
})

for (let i = 0; i < dateTimesDeadline.length; i++) {
    let dateTimeDeadline = dateTimesDeadline[i].split('-');
    emitter.emit('setTimer', new Date(+dateTimeDeadline[3], +dateTimeDeadline[2] - 1, +dateTimeDeadline[1], +dateTimeDeadline[0]));
        // year, month - 1(because the countdown of months starts from 0), date, hours
}








// let date = new Date(2023, 0, 11, 23) - new Date(2023, 0, 11, 23)
// console.log(date);
// let datetime = new moment.duration(date);

// let days = Math.floor(datetime.asDays());
// date = date - days * 8.64e7;
// datetime = new moment.duration(date);

// let hours = Math.floor(datetime.asHours());
// date = date - hours * 3.6e6;
// datetime = new moment.duration(date);

// let minutes = Math.floor(datetime.asMinutes());
// date = date - minutes * 60000;
// datetime = new moment.duration(date);

// let seconds = Math.floor(datetime.asSeconds());
// date = date - seconds * 1000;
// datetime = new moment.duration(date);
// console.log(days, hours, minutes, seconds);