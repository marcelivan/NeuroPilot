import { ScrollView } from 'react-native';
import Card from '../../components/Card';
import { cardList } from '../../src/data/cards';

export default function Feed() {
  return (
    <ScrollView contentContainerStyle={{ padding: 16, gap: 20 }}>
      {cardList.map((card) => (
        <Card
          key={card.id}
          id={card.id}
          kind={card.kind}
          title={card.title}
          body={card.body}
          ctaLabel={card.ctaLabel}
          ctaUrl={card.ctaUrl}
        />
      ))}
    </ScrollView>
  );
}
