import '@mobiscroll/react/dist/css/mobiscroll.min.css';
import { Eventcalendar, getJson, Page, setOptions, localeDe } from '@mobiscroll/react';
import { useEffect, useMemo, useState } from 'react';

setOptions({
  locale: localeDe,
  theme: 'ios',
  themeVariant: 'light'
});

function Schedule() {
  const [myEvents, setEvents] = useState([]);

  const weekView = useMemo(() => ({ agenda: { type: 'week' } }), []);

  useEffect(() => {
    getJson(
      'https://trial.mobiscroll.com/events/?vers=5&callback?',
      (events) => {
        setEvents(events);
      },
      'jsonp',
    );
  }, []);

  // Filter events to display only 4 weeks of data at a time
  const filteredEvents = useMemo(() => {
    const today = new Date();
    const fourWeeksLater = new Date();
    fourWeeksLater.setDate(today.getDate() + 28); // 4 weeks later

    return myEvents.filter(event => {
      const eventDate = new Date(event.start);
      return eventDate >= today && eventDate <= fourWeeksLater;
    });
  }, [myEvents]);

  return (
    <Page>
      <div className="mbsc-grid">
        <div className="mbsc-row">
          <div className="mbsc-col-sm-12 mbsc-col-md-4">
            <div className="mbsc-form-group">
              <div className="mbsc-form-group-title">Weekly agenda</div>
              <div className=""> {/* Reverse the order of the child elements */}
                <Eventcalendar view={weekView} data={filteredEvents} className="mb-" /> {/* Use mb-auto to push the calendar to the top */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Page>
  );
}

export default Schedule;
