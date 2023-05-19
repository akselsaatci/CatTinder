"use client";
import dynamic from "next/dynamic";

const TinderCard = dynamic(() => import("react-tinder-card"), { ssr: false });

const style = {
  tinderCardWrapper: `w-full h-full absolute`,
  wrapper: `w-full h-full overflow-hidden bg-no-repeat bg-cover bg-center relative px-8 py-4`,
  space: `flex justify-between h-3/4 items-end mb-6`,
  name: `flex text-white text-3xl font-extrabold items-center -mb-4`,
  reactionsContainer: `flex justify-between w-full px-2 gap-5`,
  buttonContainer: `h-16 w-16 rounded-full flex items-center justify-center cursor-pointer border-2`,
  buttonSymbol: `text-3xl`,
  backColors: `border-white text-white`,
  xColors: `border-red-500 text-red-500`,
  starColors: `border-blue-400 text-blue-400`,
  lightningColors: `border-purple-500 text-purple-500`,
};

interface ICard {
  imageUrl: string;
  id: string;
}

const TinderCardItem = ({
  card,
  handleRightSwipe,
  handleLeftSwipe,
}: {
  card: ICard;
  handleRightSwipe: Function;
  handleLeftSwipe: Function;
}) => {
  const onSwipe = (dir: any) => {
    if (dir === "right") {
      handleRightSwipe(card);
    }
    else if (dir === "left") {
      handleLeftSwipe(card);
    }
  };

  return (
    <>
      <TinderCard
        className={style.tinderCardWrapper}
        preventSwipe={["up", "down"]}
        onSwipe={onSwipe}
        swipeThreshold={100}
        swipeRequirementType="position"
      >
        <div
          key={card.id}
          className={style.wrapper}
          style={{
            backgroundImage: `url('${card.imageUrl}')`,
            backgroundSize: "contain",
          }}
        >
          {/* <div className={style.reactionsContainer}>
          <div className={`${style.backColors} ${style.buttonContainer}`}>
            <FaUndoAlt
              className={`${style.backColors} ${style.buttonSymbol}`}
            />
          </div>
          <div className={`${style.xColors} ${style.buttonContainer}`}>
            <AiOutlineClose
              className={`${style.xColors} ${style.buttonSymbol}`}
            />
          </div>
          <div className={`${style.starColors} ${style.buttonContainer}`}>
            <AiFillStar
              className={`${style.starColors} ${style.buttonSymbol}`}
            />
          </div>
          <div className={`${style.lightningColors} ${style.buttonContainer}`}>
            <BsFillLightningChargeFill
              className={`${style.lightningColors} ${style.buttonSymbol}`}
            />
          </div>
        </div> */}
        </div>
      </TinderCard>
    </>
  );
};

export default TinderCardItem;
