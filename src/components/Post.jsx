import { BsThreeDots } from 'react-icons/bs';
import { BiMessageRounded } from 'react-icons/bi';
import { AiOutlineHeart } from 'react-icons/ai';
import { FcLike } from 'react-icons/fc';
import { FaRetweet } from 'react-icons/fa';
import { FiShare2 } from 'react-icons/fi';
import {
  doc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  deleteDoc,
} from 'firebase/firestore';
import { auth, db } from '../firebase/config';
import { useEffect, useState } from 'react';
import moment from 'moment/moment';
import 'moment/locale/tr';

const Post = ({ tweet }) => {
  const [isLiked, setIsLiked] = useState(false);

  // tarih bilgisne erişme
  const date = tweet.createdAt?.toDate();

  // kullanıcın tweet'i beğenip beğenmediğini kontrol etme
  useEffect(() => {
    const found = tweet.likes.find(
      (userId) => userId === auth.currentUser.uid
    );

    setIsLiked(found);
  }, [tweet]);

  // kullanıcı liklamışsa kaldırır
  // yoksa ekler
  const toggleLike = () => {
    // güncellenicek tweet'in referanasını alma
    const tweetRef = doc(db, 'tweets', tweet.id);

    // aktif kullancıyı tweet'in likes dizine ekleme
    updateDoc(tweetRef, {
      likes: isLiked
        ? arrayRemove(auth.currentUser.uid)
        : arrayUnion(auth.currentUser.uid),
    });
  };

  // twiti kaldırır
  const handleDelete = () => {
    // tweet'İn referansına erişme
    const tweetRef = doc(db, 'tweets', tweet.id);
    // doc kaldırma
    deleteDoc(tweetRef);
  };

  return (
    <div className="flex gap-3 p-3 border-b-[0.5px] border-gray-600 space ">
      <img
        className="w-14 h-14 rounded-full"
        src={tweet.user.picture}
      />

      <div className="w-full">
        <div className="flex justify-between">
          <div className="flex item-center gap-3">
            <p className="font-bold">{tweet?.user?.name}</p>
            <p className="text-gray-400">
              @{tweet?.user?.name?.toLowerCase()}
            </p>
            <p className="text-gray-400">{moment(date).fromNow()}</p>
          </div>

          {tweet.user.id === auth.currentUser.uid && (
            <div
              onClick={handleDelete}
              className="p-2 rounded-full transition cursor-pointer hover:bg-gray-700"
            >
              <BsThreeDots />
            </div>
          )}
        </div>

        <div className="my-3">
          <p>{tweet.textContent}</p>
          {/* eğerki resim varsa onu ekrana bas */}
          {tweet.imageContent && <img src={tweet.imageContent} />}
        </div>

        <div className="flex justify-between">
          <div className="p-2 rounded-full transition cursor-pointer hover:bg-gray-700">
            <BiMessageRounded />
          </div>
          <div className="p-2 rounded-full transition cursor-pointer hover:bg-gray-700">
            <FaRetweet />
          </div>
          <div
            onClick={toggleLike}
            className="flex items-center gap-3 p-2 rounded-full transition cursor-pointer hover:bg-gray-700"
          >
            {isLiked ? <FcLike /> : <AiOutlineHeart />}
            <span>{tweet.likes.length}</span>
          </div>
          <div className="p-2 rounded-full transition cursor-pointer hover:bg-gray-700">
            <FiShare2 />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;