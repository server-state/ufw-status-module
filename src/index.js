const sh = require('shell-exec');

/**
 * Runs `sudo ufw status` and returns its rules in the `TableData` format
 * @throws in case the return code of `sudo ufw status` is not `0`
 * @returns {ServerState.DataFormats.TableData} The table output of `ufw status`
 */
module.exports = async function () {
    const res = await sh('sudo ufw status');
    if (res.code === 0) {
        const lines = res.stdout.split('\n').filter(v => v);

        const status = lines[0].split('Status: ')[1];

        const _fields = ['To', 'Action', 'From'];

        let rows;

        if (status === 'active') {
            const toIndex = lines[1].indexOf('To');
            const actionIndex = lines[1].indexOf('Action');
            const fromIndex = lines[1].indexOf('From');

            rows = lines.slice(3).map(rowString => ({
                'To': rowString.substring(toIndex, actionIndex - 1).trim(),
                'Action': rowString.substring(actionIndex, fromIndex - 1).trim(),
                'From': rowString.substring(fromIndex).trim(),
            }));
        } else {
            rows = [];
        }

        return ({type: 'ufw-status', status, _fields, rows});
    } else {
        throw new Error('Could not execute sudo ufw status. Details: ' + res.stdout);
    }
};
