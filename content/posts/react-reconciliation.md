---
title: "ReactJS: the reconciliation algorithm"
date: 2023-02-09T01:00:00Z
image: /images/posts/react-reconci/react-rec.webp
categories: ["react"]
featured: false
draft: false
---

## Introduction

Hello, community 🙌🏻,

One of the key features of React is its reconciliation algorithm, which determines how the library updates the DOM in response to changes in the component state.
In this blog post, we will explore the reconciliation algorithm in depth and see how it works with examples.

## What is the reconciliation algorithm?

The reconciliation algorithm is the process React uses to update the DOM in response to changes in the component state. When a component’s state changes, React will re-render the component and its children. The reconciliation algorithm is responsible for determining what has changed in the component tree and updating the DOM accordingly.

React uses a virtual DOM (VDOM) to represent the structure of the components in memory.The virtual DOM is a lightweight in-memory representation of the DOM, and it's used by React to compare the new state of the component tree with the previous state.
If there are any differences, React will update the real DOM to match the new state.

## How does the reconciliation algorithm work?

The reconciliation algorithm starts by comparing the virtual DOM of the previous state with the virtual DOM of the new state.
If there are no differences, React will not make any changes to the real DOM. If there are differences, React will update the real DOM to match the new state.

React uses a heuristic approach to determine the most efficient way to update the real DOM. The algorithm first checks if a component has changed its type, for example, from a simple text component to a complex component with multiple children. If the component type has changed, React will unmount the old component and mount the new component.

If the component type has not changed, React will compare the properties of the old and new components. If the properties have changed, React will update the properties of the real DOM element. If the children of the component have changed, React will recursively apply the reconciliation algorithm to the children components.

React also uses a technique called reusing existing DOM nodes to make the updates more efficient. If a component has not changed its type and its properties have not changed, React will reuse the existing DOM node for that component. This allows React to avoid unnecessary DOM updates and makes the updates faster.

## Example

Let's take an example to understand the reconciliation algorithm in action:

```js
import React, { useState } from "react";

function Greeting() {
  const [name, setName] = useState("mz1");

  return (
    <>
      <h1>Hello, {name}</h1>
      <button onClick={() => setName("mz2")}>Change Name</button>
    </>
  );
}

export default Greeting;
```

In this example, when the button is clicked and the name state changes, React will run the reconciliation algorithm to update the real DOM to match the new state.

React will start by comparing the virtual DOM of the previous state with the virtual DOM of the new state.
Since the component type has not changed, React will reuse the existing DOM node for the Greeting component, then it will update the text content of the h1 element to match the new name mz2.

In this example, the reconciliation algorithm has made a single DOM update to change the text content of the h1 element.

## Optimizing the performance using Keys

In React, the use of keys is important when rendering a list of elements. Keys are a special string attribute that you can provide to elements in a list to help React keep track of which items are added, deleted, or changed.

Consider the following example of a list of names:

```js
import React from "react";

function NamesList({ names }) {
  return (
    <ul>
      {names.map((name) => (
        <li key={name}>{name}</li>
      ))}
    </ul>
  );
}

export default NamesList;
```

In this example, we're using the map function to render a list of li elements, each with a name from the names array. If the names array changes, React will use the reconciliation algorithm to update the DOM to match the new virtual DOM.

However, without the use of keys, React has no way of knowing which items have been added, deleted, or changed. As a result, React may end up unnecessarily recreating all of the li elements, even if only a single name has changed. This can lead to decreased performance, especially for long lists.

By providing a unique key to each li element, React can track which items have changed and make the minimum number of DOM updates necessary. In the example above, we're using the name itself as the key, which is a unique identifier for each item in the list.

It's important to note that the value of the key should be unique among the siblings, but doesn't have to be globally unique. It's also not recommended to use indexes as keys, because they can lead to unexpected behavior when items are reordered or deleted.

# Conclusion

The "diff algorithm" and the "reconciliation algorithm" are often used interchangeably to refer to the same thing in the context of React. However, there is a subtle difference between the two terms.

The diff algorithm refers to the process of comparing two trees of nodes, such as the virtual DOM trees in React, to determine the differences between them. The diff algorithm determines the minimum number of operations required to transform one tree into another.

The reconciliation algorithm refers to the overall process of updating the DOM in response to changes in the component state. The reconciliation algorithm includes the diff algorithm as one of its steps, but it also includes additional steps such as unmounting and mounting components, updating component properties, and handling error cases.
