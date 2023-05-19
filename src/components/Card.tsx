"use client";
import React, { memo, useCallback, useEffect, useRef, useState } from "react";
import TinderCardItem from "./TinderCardItem";
import Image from "next/image";

interface ICard {
  imageUrl: string;
  id: string;
}
const Card = () => {
  const [cardList, setCardList] = useState<ICard[]>([]);
  const virtualIndex = useRef<number>(0);
  const handleLeftSwipe = async (card: ICard) => {
    fetch("/api/cats", {
      method: "POST",
      body: JSON.stringify({ catId: card.id }),
    });
    if (virtualIndex.current == 4) {
      fetch("/api/cats?limit=5", { method: "GET" }).then((res) => {
        console.log("fetch calisti");
        res.json().then((data) => {
          if (data.status === 401) {
            window.location.href = "/login";
          } else {
            var cats: ICard[] = data.data;
            setCardList([]);
            cats.forEach((cat) => {
              setCardList((prev) => [cat, ...prev]);
            });
          }
        });
      });
      virtualIndex.current = 0;
    }
    virtualIndex.current++;
  };
  const handleRightSwipe = async (card: ICard) => {
    fetch("/api/cats", {
      method: "POST",
      body: JSON.stringify({ catId: card.id }),
    });
    console.log(virtualIndex.current);
    if (virtualIndex.current == 4) {
      fetch("/api/cats?limit=5", { method: "GET" }).then((res) => {
        console.log("fetch calisti");
        res.json().then((data) => {
          if (data.status === 401) {
            window.location.href = "/login";
          } else {
            var cats: ICard[] = data.data;
            setCardList([]);
            cats.forEach((cat) => {
              setCardList((prev) => [cat, ...prev]);
            });
          }
        });
      });
      virtualIndex.current = 0;
    }
    virtualIndex.current++;
  };

  useEffect(() => {
    console.log(cardList);
    if (cardList.length > 0) return;
    fetch("/api/cats?limit=5", { method: "GET" }).then((res) => {
      console.log("fetch calisti");
      res.json().then((data) => {
        if (data.status === 401) {
          window.location.href = "/login";
        } else {
          var cats: ICard[] = data.data;
          cats.forEach((cat) => {
            setCardList((prev) => [cat, ...prev]);
          });
        }
      });
    });
  }, [cardList]);
  return (
    <div className="max-h-[45rem] w-[27rem] flex flex-col rounded-lg overflow-hidden">
      <div className="w-full flex-1 relative flex flex-col justify-center items-center bg-gray-500">
        <div className="flex flex-col justify-center items-center absolute">
          <Image
            src={"/catinder-logo.png"}
            alt="catinderLogo"
            width={128}
            height={128}
          />
          <svg
            width="140"
            height="64"
            viewBox="0 0 140 64"
            xmlns="http://www.w3.org/2000/svg"
            fill="#fff"
          >
            <path
              d="M30.262 57.02L7.195 40.723c-5.84-3.976-7.56-12.06-3.842-18.063 3.715-6 11.467-7.65 17.306-3.68l4.52 3.76 2.6-5.274c3.717-6.002 11.47-7.65 17.305-3.68 5.84 3.97 7.56 12.054 3.842 18.062L34.49 56.118c-.897 1.512-2.793 1.915-4.228.9z"
              fill-opacity=".5"
            >
              <animate
                attributeName="fill-opacity"
                begin="0s"
                dur="1.4s"
                values="0.5;1;0.5"
                calcMode="linear"
                repeatCount="indefinite"
              />
            </path>
            <path
              d="M105.512 56.12l-14.44-24.272c-3.716-6.008-1.996-14.093 3.843-18.062 5.835-3.97 13.588-2.322 17.306 3.68l2.6 5.274 4.52-3.76c5.84-3.97 13.592-2.32 17.307 3.68 3.718 6.003 1.998 14.088-3.842 18.064L109.74 57.02c-1.434 1.014-3.33.61-4.228-.9z"
              fill-opacity=".5"
            >
              <animate
                attributeName="fill-opacity"
                begin="0.7s"
                dur="1.4s"
                values="0.5;1;0.5"
                calcMode="linear"
                repeatCount="indefinite"
              />
            </path>
            <path d="M67.408 57.834l-23.01-24.98c-5.864-6.15-5.864-16.108 0-22.248 5.86-6.14 15.37-6.14 21.234 0L70 16.168l4.368-5.562c5.863-6.14 15.375-6.14 21.235 0 5.863 6.14 5.863 16.098 0 22.247l-23.007 24.98c-1.43 1.556-3.757 1.556-5.188 0z" />
          </svg>
          <div className="text-xl text-white">Getting you more cats!</div>
        </div>
        <div className="w-full h-full overflow-hidden">
          {cardList.map((card, index) => (
            <TinderCardItem
              card={card}
              key={card.id}
              handleRightSwipe={handleRightSwipe}
              handleLeftSwipe={handleLeftSwipe}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Card;
