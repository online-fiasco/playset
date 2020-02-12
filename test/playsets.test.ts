import * as sinon from 'sinon';
import { PlaysetDB } from '../src/db';
import { getPlaysets, postPlaysets } from '../src/service';
import { should, expect } from 'chai';
import { generateSampleData } from './sampledata';

should();

describe('Endpoint Test', () => {
  afterEach(() => {
    sinon.restore();
  });

  describe('GET /', () => {
    it('200 OK', async () => {
      const dbRead = sinon.stub(PlaysetDB.prototype, 'read');
      dbRead.resolves([]);

      const res = await getPlaysets({});

      res.should.be.empty;
      dbRead.called.should.be.true;
    });

    it('200 OK - Paging', async () => {
      const dbRead = sinon.stub(PlaysetDB.prototype, 'read');
      dbRead.resolves([
        { _id: 'a' } as any,
        { _id: 'b' } as any,
        { _id: 'c' } as any,
        { _id: 'd' } as any,
        { _id: 'e' } as any,
        { _id: 'f' } as any,
        { _id: 'g' } as any,
        { _id: 'h' } as any,
      ]);

      const res = await getPlaysets({ pageIndex: 2, pageSize: 3 });

      res.should.be.contains({ _id: 'd' });
      res.should.be.contains({ _id: 'e' });
      res.should.be.contains({ _id: 'f' });
      dbRead.called.should.be.true;
    });
  });

  describe('POST /', () => {
    it('200 OK', async () => {
      const dbCreate = sinon.stub(PlaysetDB.prototype, 'create');
      const sample = generateSampleData();

      await postPlaysets(sample);

      dbCreate.withArgs(sample).called.should.be.true;
    });

    it('400 Bad Request - No Playset', () => {
    });

    it("400 Bad Request - Page's category list length is not 6", () => {
    });

    it("400 Bad Request - Category's item list length is not 6", () => {
    });

    it('401 Unauthorized', () => {
    });
  });

  describe('GET /{id}', () => {
    it('200 OK', () => {
    });

    it('403 Forbidden', () => {
    });

    it('404 Not Found', () => {
    });
  });

  describe('PUT /{id}', () => {
    it('200 OK', () => {
    });

    it('400 Bad Request - No title', () => {
    });

    it('400 Bad Request - No Playset', () => {
    });

    it("400 Bad Request - Page's category list length is not 6", () => {
    });

    it("400 Bad Request - Category's item list length is not 6", () => {
    });

    it('401 Unauthorized', () => {
    });

    it('403 Forbidden', () => {
    });

    it('404 Not Found', () => {
    });
  });

  describe('DELETE /{id}', () => {
    it('200 OK', () => {
    });

    it('401 Unauthorized', () => {
    });

    it('403 Forbidden', () => {
    });

    it('404 Not Found', () => {
    });
  });
});
