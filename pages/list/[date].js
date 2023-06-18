import { useRouter } from 'next/router';
import List from '../list';

function ListPage() {
  const router = useRouter();
  const { date } = router.query;

  // Fetch data or perform operations based on the 'date' parameter

  return (
    <List date={date}></List>
  );
}

export default ListPage;
