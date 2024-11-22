import { ExcessiveCancellationsChecker } from '../excessive-cancellations-checker.js';

const checker = new ExcessiveCancellationsChecker('./data/trades.csv');

describe('Excessive Cancellations Test', () => {
  describe('calculate', () => {
    it('parses file correctly', async () => {
      await checker.parseFile();
      const companyMap = checker.companyMap;
      const companies = [...companyMap.keys()];

      expect(companies.length).toEqual(14);

      const tradeList = companyMap.get('Cauldron cooking');

      expect(tradeList.length).toBe(5);

      expect(tradeList[0].time).toBeInstanceOf(Date);
      expect(typeof tradeList[0].type).toBe('string');
      expect(typeof tradeList[0].amount).toBe('number');
    });

    it('returns the correct number of well behaved companies', async () => {
      const companyCount = await checker.totalNumberOfWellBehavedCompanies();
      expect(companyCount).toEqual(12);
    });
  });
});
