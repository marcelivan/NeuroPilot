type CardData = {
  id: number;
  kind: string;
  title: string;
  body: string;
  ctaLabel?: string;
  ctaUrl?: string;
};

export const cardList: CardData[] = [
  {
    id: 1,
    kind: 'affirmation',
    title: 'You’re not your thoughts.',
    body: 'Pause. Witness your mind. Freedom begins by noticing the noise, not fighting it.',
  },
  {
    id: 2,
    kind: 'affirmation',
    title: 'Small effort, big wins.',
    body: 'Success is progress, not perfection.',
  },
];
