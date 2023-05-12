import { useRive, useStateMachineInput } from '@rive-app/react-canvas';
import { useEffect } from 'react';

const LikeAnimation = ({ liked, onLikeChange }: any) => {
  const { rive, RiveComponent } = useRive({
    src: 'like-button.riv',
    autoplay: false,
    stateMachines: 'stateMachine',
  });

  const onClickInput = useStateMachineInput(rive, 'stateMachine', 'checked');

  useEffect(() => {
    if (onClickInput) {
      onClickInput.value = liked;
      rive && rive.play();
    }
  }, [liked, onClickInput, rive]);

  const handleClick = () => {
    if (onClickInput) {
      onClickInput.value = !onClickInput.value;
      rive && rive.play();
      onLikeChange();
    }
  };

  if (!RiveComponent) {
    return <div>Loading...</div>;
  }

  return (
    <div
      style={{
        width: '25px',
        height: '25px',
        cursor: 'pointer',
        display: 'inline-block',
      }}
      onClick={handleClick}
    >
      <RiveComponent        style={{
        width: '25px',
        height: '25px',

      }}/>
    </div>
  );
};

export default LikeAnimation;
