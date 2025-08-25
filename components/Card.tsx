import { View, Text, Pressable, Share } from 'react-native';
import { likeCard, isLiked } from '../src/lib/db';

// Example data for an affirmation card
const affirmationCard = {
  id: 99,
  kind: "affirmation",
  title: "You’re not your thoughts.",
  body: "Pause. Witness your mind. Freedom begins by noticing the noise, not fighting it."
};

type Props = { id: number; kind: string; title: string; body?: string; ctaLabel?: string; ctaUrl?: string };
export default function Card({ id, kind, title, body, ctaLabel, ctaUrl }: Props){
  const liked = isLiked(id);
  const onLike = () => likeCard(id);
  const onShare = async () => {
    await Share.share({ message: `${title}\n${body ?? ''}`.trim() });
  };
  const onCTA = () => {
    if (!ctaUrl) return; // TODO: Linking.openURL(ctaUrl) and log referral
  };
  return (
    <View style={{ backgroundColor: 'white', borderRadius: 16, padding: 16, gap: 8 }}>
      <Text style={{ color: '#777' }}>{`#${kind}`}</Text>
      <Text style={{ fontSize: 22, fontWeight: '700' }}>{title}</Text>
      {body ? <Text>{body}</Text> : null}
      <View style={{ flexDirection: 'row', gap: 12 }}>
        <Pressable onPress={onShare}><Text>SHARE ⤴</Text></Pressable>
        <Pressable onPress={onLike}><Text>{liked ? '♥ Liked' : '♡ Like'}</Text></Pressable>
        {ctaUrl ? <Pressable onPress={onCTA}><Text>{ctaLabel ?? 'GET'}</Text></Pressable> : null}
      </View>
    </View>
  );
}

// Example usage of Card component
export function AffirmationCardDemo() {
  return <Card {...affirmationCard} />;
}
