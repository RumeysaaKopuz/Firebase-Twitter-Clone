import { useEffect, useState } from 'react';
import TweetForm from './TweetForm';
import {
  onSnapshot,
  collection,
  query,
  orderBy,
} from 'firebase/firestore';
import { db } from '../firebase/config';
import Post from './Post';

const Main = () => {
  const [tweets, setTweets] = useState(null);

  // kolleksiyonun referansını alma
  const tweetsCol = collection(db, 'tweets');

  useEffect(() => {
    // filtreleme ayarlarını tanımalma
    const queryOptions = query(
      tweetsCol,
      orderBy('createdAt', 'desc')
    );

    // kolleksiyondaki değişimi izler
    onSnapshot(queryOptions, (snapshot) => {
      // tweetleri geçeici olarak tuttuğumuz dizi
      const liveTweets = [];

      // dokümanların verilerine erişip diziye aktarma
      snapshot.forEach((doc) =>
        liveTweets.push({ ...doc.data(), id: doc.id })
      );

      setTweets(liveTweets);
    });
  }, []);

  return (
    <main className="max-w-[600px] col-span-4 md:col-span-3 border border-gray-800">
      <header className="font-bold p-4 border-b-2 border-[#4746466f]">
        AnaSayfa
      </header>
      <TweetForm />

      {/* loading  */}
      {!tweets && (
        <p className="text-center mt-[200px]"> Yükleniyor....</p>
      )}

      {/* atılan tweetlerin listlendiği alan */}
      {tweets?.map((tweet) => (
        <Post tweet={tweet} />
      ))}
    </main>
  );
};

export default Main;