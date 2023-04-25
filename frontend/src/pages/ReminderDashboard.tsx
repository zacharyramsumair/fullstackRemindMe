import RemindersList from "../components/RemindersList";
import CreateReminderForm from "../components/createReminderForm";

type Props = {};

const Dashboard = (props: Props) => {
	return (
    <>
    	<section>
      <CreateReminderForm/>
		</section>

    <hr />
    
	<section className="content">

      <RemindersList/>
  </section>
    </>
	);
};

export default Dashboard;
