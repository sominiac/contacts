import { useEffect, useState } from 'react';
import { Contacts, Placeholder, ContactInformation, FormChange } from './components';

function App() {

  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/db.json')
      .then(response => response.json())
      .then(data => { setData(data) })
  }, [])

  return (
    <section className="page-content">
      <div className="container">
        <div className="page-content__inner">

          <div className="sidebar">
            <h1 className="sidebar__title">
              Contacts
            </h1>
            <div className="sidebar__actions">
              <div className="sidebar__sorting">
                <button className="sidebar__sorting-button sidebar__sorting-button--asc">Sorting<br />From A to Z</button>
                <button className="sidebar__sorting-button sidebar__sorting-button--desc">Sorting<br />From Z to A</button>
              </div>
              <input className="sidebar__search" type="text" placeholder="Search..." />
            </div>
            <Contacts item={data} />
          </div>

          <main className="main-content">
            <Placeholder isVisible={true} />
            <ContactInformation isVisible={false} />
            <FormChange isVisible={false} />
          </main>

        </div>
      </div>
    </section>
  );
}

export default App;
