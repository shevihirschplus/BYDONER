export enum EventType {
  Birthday = 'Birthday',
  Yahrzeit = 'Yahrzeit',
  Wedding = 'Wedding',
  BarMitzva = 'BarMitzva',
  Dinner = 'Dinner',
  Visit = 'Visit'
}

export const EVENT_TYPE_LABELS: Record<EventType, string> = {
  [EventType.Birthday]: 'Birthday',
  [EventType.Yahrzeit]: 'יורצאיט',
  [EventType.Wedding]: 'Wedding',
  [EventType.BarMitzva]: 'Bar Mitzva',
  [EventType.Dinner]: 'Dinner',
  [EventType.Visit]: 'ביקור התרמה'
};

export interface DonorEvent {
  id: string;
  donorId: string;
  eventType: EventType;
  eventDate: string;
  notes: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface CreateEventRequest {
  eventType: EventType;
  eventDate: string;
  notes: string | null;
}

export interface UpdateEventRequest {
  eventType: EventType;
  eventDate: string;
  notes: string | null;
}
