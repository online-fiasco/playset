import * as sinon from 'sinon';
import { PlaysetDB } from '../src/db';
import { getPlaysets } from '../src/service';
import { should } from 'chai';

should();

describe('Service Test', () => {
  afterEach(() => {
    sinon.restore();
  });

  describe('Get Playset', () => {
    it('Normal case', async () => {
      const readStub = sinon.stub(PlaysetDB.prototype, 'read');
      readStub.resolves([]);

      const result = await getPlaysets({});

      result.should.be.exist.and.empty;
      readStub.called.should.be.true;
    });

    it('Paging', async () => {
      const readStub = sinon.stub(PlaysetDB.prototype, 'read');
      readStub.resolves([]);

      const result = await getPlaysets({ pageIndex: 2, pageSize: 3 });

      result.should.be.contains({ _id: 'd' });
      result.should.be.contains({ _id: 'e' });
      result.should.be.contains({ _id: 'f' });
      readStub.called.should.be.true;
    });
  });
});
