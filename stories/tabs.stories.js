import { storiesOf } from "@storybook/react";
import React from "react";
import Tabs from "../src/components/tabs";
import { action } from "@storybook/addon-actions";
import "../src/index.css";
import "./tabs.css";
import base from 'paths.macro';

const getTabView = (index, title = undefined) => (
  <div tabTitle={title}>
    <h3>This is tab view {index + 1}</h3>
    <p>
      In publishing and graphic design, lorem ipsum is a placeholder text
      commonly used to demonstrate the visual form of a document without relying
      on meaningful content. Replacing the actual content with placeholder text
      allows designers to design the form of the content before the content
      itself has been produced.
    </p>
  </div>
);

storiesOf(`Tabs|${base}/Usage`, module)
  .add("with basic usage", () => {
    return (
      <div className="c-holder">
        <Tabs>
          {Array.apply(null, { length: 6 }).map((item, i) => getTabView(i))}
        </Tabs>
      </div>
    );
  })
  .add(
    "with tabTitle",
    () => {
      return (
        <div className="c-holder">
          <p>
            Here we used <code>tabTitle</code> prop of the child to specify the
            tab button label
          </p>
          <blockquote>
            &lt;Tabs> &lt;div tabTitle="my cutom title"> tab view content
            &lt;/div> &lt;/Tabs>
          </blockquote>
          <Tabs>
            {Array.apply(null, { length: 6 }).map((item, i) =>
              getTabView(i, "My Tab " + (i + 1))
            )}
          </Tabs>
        </div>
      );
    },
    {
      notes: "just testing the notes addon"
    }
  )
  .add("with custom className's", () => {
    return (
      <div className="c-holder">
        <p>
          You can use <code>className</code> to style the tab container,{" "}
          <code>tabButtonClassName</code> to style the tab button component and{" "}
          <code>tabViewClassName</code> to style the tab view container.
        </p>
        <Tabs
          className="my-tabs"
          tabButtonClassName="my-tab-button"
          tabViewClassName="my-tab-view"
        >
          {Array.from({ length: 6 }).map((item, i) => getTabView(i))}
        </Tabs>
      </div>
    );
  })
  .add("with tabPosition", () => {
    let positions = ["top", "right", "bottom", "left"];
    return (
      <div className="c-holder">
        <p>
          You can change the position of the tab using <code>tabPosition</code>{" "}
          props
        </p>
        <hr />
        {positions.map((pos, i) => (
          <div>
            <h2>tabPosition = "{pos}"</h2>
            <Tabs tabPosition={pos}>
              {Array.apply(null, { length: 6 }).map((item, i) => getTabView(i))}
            </Tabs>
            <hr />
          </div>
        ))}
      </div>
    );
  })
  .add("with onTabChanging handler", () => {
    return (
      <div className="c-holder">
        <div>
          <p>
            You cannot select "Tab 3" We used <code>e.preventDefault()</code> in
            the <code>onTabChanging(e)</code> handler
          </p>
        </div>
        <Tabs
          defaultIndex={3}
          onTabChanging={(e, i) => i === 2 && e.preventDefault()}
        >
          {Array.apply(null, { length: 6 }).map((item, i) => getTabView(i))}
        </Tabs>
      </div>
    );
  })
  .add("with onTabChange handler", () => {
    return (
      <div className="c-holder">
        <Tabs onTabChange={action("tab index changed")}>
          {Array.apply(null, { length: 6 }).map((item, i) => getTabView(i))}
        </Tabs>
      </div>
    );
  });
