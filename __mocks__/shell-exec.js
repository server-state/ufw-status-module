module.exports = async function f(cmd) {
    return {
        cmd,
        code: 0,
        stderr: '',
        stdout: `Status: active

To                         Action      From
--                         ------      ----
22                         LIMIT       Anywhere
WWW                        LIMIT       Anywhere
WWW Secure                 LIMIT       Anywhere
80/tcp                     ALLOW       Anywhere
443/tcp                    ALLOW       Anywhere
22 (v6)                    LIMIT       Anywhere (v6)
WWW (v6)                   LIMIT       Anywhere (v6)
WWW Secure (v6)            LIMIT       Anywhere (v6)
80/tcp (v6)                ALLOW       Anywhere (v6)
443/tcp (v6)               ALLOW       Anywhere (v6)

`
    };

};
