import * as sinon from 'sinon';
import { PlaysetDB } from '../src/db';
import { getPlaysets, postPlaysets, getSinglePlaysets } from '../src/service';
import * as chai from 'chai';
import * as chaiAsPromised from 'chai-as-promised';

import { generateSampleData } from './sampledata';

chai.should();
chai.use(chaiAsPromised);

describe('Service Test', () => {
  afterEach(() => {
    sinon.restore();
  });

  describe('Get Playsets', () => {
    it('Normal case', async () => {
      const readStub = sinon.stub(PlaysetDB.prototype, 'read');
      readStub.resolves([{ _id: 'a' } as any]);

      const result = await getPlaysets({});

      result.should.deep.includes({ _id: 'a' });
      readStub.called.should.be.true;
    });

    it('Paging', async () => {
      const readStub = sinon.stub(PlaysetDB.prototype, 'read');
      readStub.resolves([{ _id: 'a' } as any]);

      const result = await getPlaysets({ pageIndex: 2, pageSize: 3 });

      result.should.deep.includes({ _id: 'a' });
      readStub.withArgs({}, { pageIndex: 2, pageSize: 3 }).called.should.be.true;
    });
  });

  describe('Create New Playset', () => {
    it('Normal case', async () => {
      const createStub = sinon.stub(PlaysetDB.prototype, 'create');
      const sample = generateSampleData();

      await postPlaysets(sample);

      createStub.withArgs(sample).called.should.be.true;
    });

    it('Wrong type as any', async () => {
      const createStub = sinon.stub(PlaysetDB.prototype, 'create');
      const sample = {} as any;

      const promise = postPlaysets(sample);

      await promise.should.be.rejectedWith(TypeError);
      createStub.called.should.be.false;
    });

    it('Create playset with page not have 6 category', () => {
      const createStub = sinon.stub(PlaysetDB.prototype, 'create');

      const sample = generateSampleData();
      sample.desire = sample.desire.slice(0, 6);

      const promise = postPlaysets(sample);

      promise.should.be.rejectedWith(TypeError, 'page should have 6 categories');
      createStub.called.should.be.false;
    });

    it('Create playset with category not have 6 item', () => {
      const createStub = sinon.stub(PlaysetDB.prototype, 'create');

      const sample = generateSampleData();
      sample.desire[0].items = sample.desire[0].items.slice(0, 6);

      const promise = postPlaysets(sample);

      promise.should.be.rejectedWith(TypeError, 'category should have 6 items');
      createStub.called.should.be.false;
    });
  });

  describe('Get Single Playset', () => {
    it('Normal case', async () => {
      const readStub = sinon.stub(PlaysetDB.prototype, 'readOne');
      readStub.resolves({ test: 'clear' } as any);

      const result = await getSinglePlaysets('sampleid');

      result.should.be.has.property('test', 'clear');
      readStub.withArgs({ _id: 'sampleid' }).called.should.be.true;
    });

    it('No such playset', async () => {
      const readStub = sinon.stub(PlaysetDB.prototype, 'readOne');
      readStub.resolves(undefined);

      const result = await getSinglePlaysets('sampleid');

      result.should.be.undefined;
      readStub.withArgs({ _id: 'sampleid' }).called.should.be.true;
    });
  });
});
