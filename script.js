window.onload = () => {
    let eventList = [];
    let ID_COUNTED = 0;
    let parentContainer = document.getElementById('task-container');
    let addNewEventBtn = document.getElementById('add-event-btn');
    let sortValue = document.getElementById('sort-dropdown');

    /// creating dom tree from obj
    let createEvent = (obj, array) => {
        /// delete element from array with events
        let removeEvent = () => {
            eventList = eventList.filter(elem => elem.id !== obj.id);
            sortEvents(array);
            console.log(eventList);
        };

        /// create element func with adding to him classname
        let createElementWithClassName = (tagName, className) => {
            let newElem = document.createElement(tagName);
            if (className) {
                newElem.className = className;
            }
            return newElem;
        };

        /// create all need elements
        let eventContainer = createElementWithClassName('div', 'event-container');
        let petName = createElementWithClassName('p', 'pet-name');
        let ownerName = createElementWithClassName('p', 'owner-name');
        let eventDate = createElementWithClassName('p', 'event-date');
        let eventTime = createElementWithClassName('p', 'event-time');
        let eventNote = createElementWithClassName('p', 'event-note');
        let deleteEvent = createElementWithClassName('span', 'dlt-btn');

        ///get all values from array with
        petName.textContent = obj.petName;
        ownerName.textContent = obj.ownerName;
        eventDate.textContent = obj.eventDate;
        eventTime.textContent = obj.eventTime;
        eventNote.textContent = obj.eventNote;

        /// create close button and give handler
        deleteEvent.textContent = '✖';
        // deleteEvent.textContent = '+';
        deleteEvent.addEventListener('click', removeEvent);

        /// creating dom tree
        eventContainer.appendChild(petName);
        eventContainer.appendChild(ownerName);
        eventContainer.appendChild(eventDate);
        eventContainer.appendChild(eventTime);
        eventContainer.appendChild(eventNote);
        eventContainer.appendChild(deleteEvent);
        parentContainer.appendChild(eventContainer);
    };

    /// redrawing event list
    let showEvents = (array) => {
        parentContainer.innerHTML = '';
        array.forEach(elem => {
            createEvent(elem, array);
        });
    };

    /// push a new event to the event array
    let addEvent = () => {

        /// getting element value by id selecting and clearing after getting
        let getElementValue = (elementId) => {
            let elem = document.getElementById(elementId).value;
            document.getElementById(elementId).value = '';
            return elem;
        };

        /// creating new event by pushing values from inputs to eventList
        eventList.push({
            id: ID_COUNTED++,
            petName: getElementValue('pet-name-input'),
            ownerName: getElementValue('owner-name-input'),
            eventDate: getElementValue('event-date-input'),
            eventTime: getElementValue('event-time-input'),
            eventNote: getElementValue('event-note-input'),
        });
        showEvents(eventList);
        console.log(eventList);
    };

    /// sort events when change sort dropdown
    let sortEvents = () => {
        /// create copy of event array to sort ('sort' method will change original array)
        let sortedEventList = eventList.concat([]);

        /// create func, that will run depending on entered parameter of sorting
        let sortFunc = (sortParam) => {
            sortedEventList.sort((a, b) => {
                if (a[sortParam].toLowerCase() > b[sortParam].toLowerCase()){
                    return 1;
                } else if (a[sortParam].toLowerCase() < b[sortParam].toLowerCase()) {
                    return -1;
                } else return 0;
            });
            showEvents(sortedEventList);
        };

        /// check  value of sort dropdown
        if (sortValue.value === 'date') {
            sortFunc('eventDate');
        } else if (sortValue.value === 'owner') {
            sortFunc('ownerName');
        } else if (sortValue.value === 'pet') {
            sortFunc('petName');
        } else {
            showEvents(eventList);
        }
    };

    addNewEventBtn.addEventListener('click', addEvent);
    sortValue.addEventListener('change', sortEvents);
};

