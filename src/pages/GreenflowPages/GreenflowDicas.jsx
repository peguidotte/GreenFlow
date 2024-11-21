import FeedbackCards from "../../components/Feedback";

function GreenflowDicas() {
  return (
    <div className="flex items-center justify-center mt-16">
      <FeedbackCards tipsDisplay={10} consumptionDisplay={false} />
    </div>
  );
}

export default GreenflowDicas;
