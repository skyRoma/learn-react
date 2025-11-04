import { Accordion } from "./components/Accordion/Accordion";
import Place from "./components/Place";
import { SearchableList } from "./components/SearchableList/SearchableList";
import { PLACES } from "./places";

function App() {
  return (
    <main>
      <section>
        <h2>Why work with us?</h2>
        <Accordion className="accordion">
          <Accordion.Item id="experience" className="accordion-item">
            <Accordion.Title className="accordion-item-title" >
              We got 20 years of experience
            </Accordion.Title>
            <Accordion.Content className="accordion-item-content" >
              <article>
                <p>
                  You cant go wrong with us
                </p>
              </article>
            </Accordion.Content>
          </Accordion.Item>

          <Accordion.Item id="local-guides" className="accordion-item">
            <Accordion.Title className="accordion-item-title" >
              We are working with local guides
            </Accordion.Title>
            <Accordion.Content className="accordion-item-content">
              <article>
                <p>
                  We are not doing this along from our office
                </p>
              </article>
            </Accordion.Content>
          </Accordion.Item>
        </Accordion>
      </section>
      <section>
        <SearchableList items={PLACES} itemKeyFn={(item) => item.id}>
          {(item) => <Place item={item} />}
        </SearchableList>
        <SearchableList items={['item 1', 'item 2']} itemKeyFn={(item) => item}>
          {(item) => item}
        </SearchableList>
      </section>
    </main>
  );
}

export default App;
