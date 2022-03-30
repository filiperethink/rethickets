import "./style.css";
import { Form, List } from "../../components/index";
import { useCallback, useEffect, useState } from "react";
import { v4 as uuid } from "uuid";
import { indexEventsServices } from "../../services/eventsServices";
import axios from "axios";

type ScreenHomeProps = {};

type EventsData = {
  name: String;
  eventImageSmall: String;
  resume: String;
  type: String;
  eventDate: String;
};

type ListItemType = {
  title: string;
  isActive: boolean;
  id: string;
  data: EventsData[];
};
type ListTypes = ListItemType[];

function HomeScreen() {
  const [eventsList, setEventList] = useState<ListTypes>([]);

  useEffect(() => {
    axios.get("http://localhost:3030/events").then((reponse: { data: any }) => {
      setEventList([
        {
          title: "Principais Eventos na Rethink",
          isActive: false,
          id: uuid(),
          data: reponse.data,
        },
      ]);
    });
  }, [0]);

  const handleClick = useCallback((isActive: boolean, id: string) => {
    const formattedList =
      eventsList.length > 0
        ? eventsList.map((event: ListItemType) => {
            console.log(id, event.id);
            if (id === event.id) {
              return {
                ...event,
                isActive: isActive,
              };
            }
            return {
              ...event,
              isActive: false,
            };
          })
        : [];

    setEventList(formattedList);
  }, []);

  return (
    <div className='home-container'>
      <Form placeholderText='Busque por Eventos, Palestras ou reuniões' />
      <div className='events-container'>
        {eventsList.map((event) => {
          return (
            <List
              handleClick={handleClick}
              key={event.id}
              isActive={event.isActive}
              title={event.title}
              id={event.id}
              data={event.data}
            />
          );
        })}
      </div>
    </div>
  );
}

export default HomeScreen;
