/**
 * @author Roi-ptr
 * This code cited from "Node-base91" package.
 */

 /**
  * BSD 3-Clause License

Copyright (c) 2017, Equim
All rights reserved.

Redistribution and use in source and binary forms, with or without
modification, are permitted provided that the following conditions are met:

* Redistributions of source code must retain the above copyright notice, this
  list of conditions and the following disclaimer.

* Redistributions in binary form must reproduce the above copyright notice,
  this list of conditions and the following disclaimer in the documentation
  and/or other materials provided with the distribution.

* Neither the name of the copyright holder nor the names of its
  contributors may be used to endorse or promote products derived from
  this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE
FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.

  */

'use strict';

const { Transform } = require('stream');

const table = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!#$%&()*+,./:;<=>?@[]^_`{|}~"';

/**
 * Encode data to basE91, where data can be `String` or `Buffer`.
 *
 * @param  {String | Buffer} data - data to be encoded
 * @param  {String} encoding - the encoding of `data` string. Default: `'utf8'`.
 *                             This argument is ignored when `data` is already a `Buffer`.
 * @return {String} - basE91 encoded string
 * @api public
 */
exports.encode = (data, encoding = 'utf8') => {
  if (data == null) {
    throw new Error('base91: Missing data to encode.');
  }
  const raw = Buffer.isBuffer(data) ? data :
    typeof data === 'number' ? Buffer.from(data.toString(), encoding) :
    Buffer.from(data, encoding);
  const len = raw.length;
  let ret = '';

  let n = 0;
  let b = 0;

  for (let i = 0; i < len; i++) {
    b |= raw[i] << n;
    n += 8;

    if (n > 13) {
      let v = b & 8191;
      if (v > 88) {
        b >>= 13;
        n -= 13;
      } else {
        v = b & 16383;
        b >>= 14;
        n -= 14;
      }
      ret += table[v % 91] + table[v / 91 | 0];
    }
  }

  if (n) {
    ret += table[b % 91];
    if (n > 7 || b > 90) ret += table[b / 91 | 0];
  }

  return ret;
};

exports.EncodeStream = class extends Transform {
  /**
   * constructor
   * @param  {Object} opt - passed to `new stream.Transform`
   */
  constructor(opt) {
    super(opt);

    this.setEncoding('utf8');
    this._n = this._b = 0;
  }

  /**
   * implemented `transform._transform`
   * @param  {Buffer | String} chunk - inherited from `transform._transform`
   * @param  {String} encoding - inherited from `transform._transform`, ignored in this case
   * @param  {Function} cb - inherited from `transform._transform`
   */
  _transform(chunk, encoding, cb) {
    // assert chunk is `Buffer`
    for (let i = 0; i < chunk.length; i++) {
      this._b |= chunk[i] << this._n;
      this._n += 8;

      if (this._n > 13) {
        let v = this._b & 8191;
        if (v > 88) {
          this._b >>= 13;
          this._n -= 13;
        } else {
          v = this._b & 16383;
          this._b >>= 14;
          this._n -= 14;
        }
        this.push(table[v % 91] + table[v / 91 | 0]);
      }
    }
    cb();
  }

  /**
   * implemented ` transform._flush`
   * @param  {Function} cb - inherited from `transform._flush`
   */
  _flush(cb) {
    if (this._n) {
      this.push(table[this._b % 91]);
      if (this._n > 7 || this._b > 90) this.push(table[this._b / 91 | 0]);
    }
    cb();
  }
};

/**
 * Decode basE91 string into `Buffer` or `String`.
 *
 * @param  {String} data - basE91 string to be decoded
 * @param  {String} encoding - the string encoding of decoded data. If this argument
 *                             is not specified, it will return a `Buffer`.
 * @return {String | Buffer} - decoded data
 * @api public
 */
exports.decode = (data, encoding) => {
  const raw = '' + (data || '');
  const len = raw.length;
  const ret = [];

  let b = 0;
  let n = 0;
  let v = -1;

  for (let i = 0; i < len; i++) {
    const p = table.indexOf(raw[i]);
    if (p === -1) continue;
    if (v < 0) {
      v = p;
    } else {
      v += p * 91;
      b |= v << n;
      n += (v & 8191) > 88 ? 13 : 14;
      do {
        ret.push(b & 0xff);
        b >>= 8;
        n -= 8;
      } while (n > 7);
      v = -1;
    }
  }

  if (v > -1) {
    ret.push((b | v << n) & 0xff);
  }

  return encoding ?
    Buffer.from(ret).toString(encoding) :
    Buffer.from(ret);
};

exports.DecodeStream = class extends Transform {
  /**
   * constructor
   * @param  {Object} opt - passed to `new stream.Transform`
   */
  constructor(opt) {
    super(opt);

    this._b = this._n = 0;
    this._v = -1;
  }

  /**
   * implemented `transform._transform`
   * @param  {Buffer | String} chunk - inherited from `transform._transform`
   * @param  {String} encoding - inherited from `transform._transform`, ignored in this case
   * @param  {Function} cb - inherited from `transform._transform`
   */
  _transform(chunk, encoding, cb) {
    const raw = chunk.toString();
    for (let i = 0; i < raw.length; i++) {
      const p = table.indexOf(raw[i]);
      if (p === -1) continue;
      if (this._v < 0) {
        this._v = p;
      } else {
        this._v += p * 91;
        this._b |= this._v << this._n;
        this._n += (this._v & 8191) > 88 ? 13 : 14;
        do {
          this.push(Buffer.from([this._b & 0xff]));
          this._b >>= 8;
          this._n -= 8;
        } while (this._n > 7);
        this._v = -1;
      }
    }
    cb();
  }

  /**
   * implemented ` transform._flush`
   * @param  {Function} cb - inherited from `transform._flush`
   */
  _flush(cb) {
    if (this._v > -1) {
      this.push(Buffer.from([(this._b | this._v << this._n) & 0xff]));
    }
    cb();
  }
};
