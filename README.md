# Deep Array Transform

## Motivation

This is a tool used for recursivly transforming json structures. More specifically transform arrays to key->value objects.

## Installation

```
npm install deep-array-transform
```

The Gist

```
import transform from 'deep-array-transfor'

const apiData = [
    {id: 1, price: 5, data: "this is some data"},
    {id: 2, price: 5, data: "this is some other data"}
]

const obj = transform(apiData)

//results in the following object
{
    0: {id: 1, price: 5, data: "this is some data"},
    1: {id: 2, price: 5, data: "this is some other data"}
}
```

## Options

There exists a few options to tweek how you want your data parsed

* defaultKey: tell which attribute in the structure you want the mapping to be done on.
  **defaults** to using the array index for key.

defaultKey accepts either a string

```
const options = {id: "apiId"}
const data = [{apiId1: "id1"}]
transform(data, options)
//will result in transforming like following
{
    "apiId1": {apiId1: "id1"}
}
```

a object with rules for found keys with a fallback value of default

```
const options = {id: {default: "apiId", subData: "subId"}}
const data = [{apiId1: "id1", subData: [{subId: "id1"}]}]
transform(data, options)
//will result in transforming like following
{
    "apiId1": {
        apiId1: "id1",
        subData: {
            id1: {subId: "id1"}
        }
    }
}
```

* recursively: search all nodes in the data for structures to transform, this will continue the search down the data for all arrays and transform them. **default**: true

```
const options = {recursively: false}
const data = [{apiId1: "id1", subData: [{subId: "id1"}]}]
transform(data,options)
//will result in transforming like following
{
    "apiId1": {
        apiId1: "id1",
        subData: [{subId: "id1"}]
    }
}
```

* ignorePattern: give a pattern for object keys that should not be parsed or traversed. When encountering a match the traversel along the matched subtree is stoped. **default**: "_empty string_"

```
const options = {ignorePattern: "Data"}
const data = [{apiId1: "id1", subData: [{subId: "id1"}]}]
transform(data,options)
//will result in transforming like following
{
    "apiId1": {
        apiId1: "id1",
        subData: [{subId: "id1"}]
    }
}
```
