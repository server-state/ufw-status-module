# ufw-status-module
|Info|Value|
|---|---|
|Repository|https://github.com/server-state/ufw-status-module|
|NPM Package|[`@server-state/ufw-status-module`](https://www.npmjs.com/package/@server-state/ufw-status-module)|
|Package version|[![npm version](https://badge.fury.io/js/%40server-state%2Fufw-status-module.svg)](https://www.npmjs.com/package/@server-state/ufw-status-module)|
|CI Build|[![Build Status](https://travis-ci.com/server-state/ufw-status-module.svg?branch=master)](https://travis-ci.com/server-state/ufw-status-module)|
|Issues|[GitHub Issues](https://github.com/server-state/ufw-status-module/issues?q=is%3Aissue+is%3Aopen+sort%3Aupdated-desc)|

## Abstract
A module for querying the status of a UFW firewall (requires sudo privileges)

This official [*Server State Server Module*](https://specs.server-state.tech/#/terminology/server-module) belongs to the organization [Server State](https://github.com/server-state).

### Setup
To successfully use this module, you'll need to grant the user executing the command (here, we'll call him `nodeUser`)
sudo (or root) execution rights for the command `ufw status`. To do this, please add the following `server-state-ufw-status-module` file to
`/etc/sudoers.d/`:

```
nodeUser ALL=(ALL) NOPASSWD: /usr/bin/ufw status
```


## Input
### Type
```typescript
undefined
```

### Description
No input is needed for this module

## Output
This is using

- [x] A standard data format as defined in [Data Formats](/arch/data-formats.md)
- [x] A custom data format described below

### Custom data format specifications
Type: [`TableData`](https://types.server-state.tech/modules/serverstate.dataformats.html#tabledata) -compatible

```ts
{  
    type: 'ufw-status',
    status: 'active' | 'inactive',
    _fields: string[],
    rows: Array<{
        [_field: string]: string | number | boolean
    }>
}
```

### Specifications about the information in the return variable
n/a

### Exceptions (if applicable)
#### `sudo ufw status` returned with an exit code other than `0`
If `sudo ufw status` returns with an exit code other than `0`, an Error containing the `stderr` output in its message gets thrown.

## Performance
The module performs the tasks in a runtime-complexity of

_O(n)_

where _n_ is the number of rules in the status (i.e., here, table rows).

