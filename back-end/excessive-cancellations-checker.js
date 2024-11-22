import fs from 'fs';
import { parse } from 'csv-parse';
import { finished } from 'stream/promises';

export class ExcessiveCancellationsChecker {
  /*
        We provide a path to a file when initiating the class
        you have to use it in your methods to solve the task
    */
  constructor(filePath) {
    this.filePath = filePath;
    this.companyMap = new Map();
  }

  /**
   * Returns the list of companies that are involved in excessive cancelling.
   * Note this should always resolve an array or throw error.
   */
  async companiesInvolvedInExcessiveCancellations() {
    await this.parseFile();

    const naughtyList = [];

    for (const company of this.companyMap.keys()) {
      if (this.isCancellingExcessively(this.companyMap.get(company))) {
        naughtyList.push(company);
      }
    }

    return naughtyList;
  }

  /**
   * Returns the total number of companies that are not involved in any excessive cancelling.
   * Note this should always resolve a number or throw error.
   */
  async totalNumberOfWellBehavedCompanies() {
    const naughtyList = await this.companiesInvolvedInExcessiveCancellations();
    const companies = [...this.companyMap.keys()];

    return companies.length - naughtyList.length;
  }

  async parseFile() {
    const parser = fs
      .createReadStream(this.filePath)
      .pipe(parse({ skip_records_with_error: true }))
      .on('data', (row) => {
        try {
          const time = new Date(row[0]);
          const company = row[1];
          const type = row[2];
          const amount = parseInt(row[3]);

          let list = this.companyMap.get(company);

          if (!list) {
            list = [];
          }

          list.push({ time, type, amount });

          this.companyMap.set(company, list);
        } catch (error) {
          console.error(error.message);
        }
      })
      .on('end', () => {
        console.log('Finished reading CSV file.');
      })
      .on('error', (error) => {
        console.error(error.message);
      });

    try {
      await finished(parser);
    } catch (error) {
      console.error('Error while reading the stream:', error);
    }
  }

  isCancellingExcessively(trades) {
    const stack = [];
    let totalBuy = 0;
    let totalCancel = 0;

    for (const trade of trades) {
      if (!stack.length) {
        stack.push(trade);
      } else {
        const oldestTrade = stack[0];

        let timeDiff = (oldestTrade.time - trade.time) / 1000;
        const cancelRatio = totalBuy + totalCancel ? totalCancel / (totalBuy + totalCancel) : 0;

        if (timeDiff > 60 && cancelRatio > 1 / 3) {
          return true;
        }

        while (timeDiff > 60) {
          const removed = stack.shift();

          switch (removed.type) {
            case 'D':
              totalBuy -= removed.amount;
              break;
            case 'F':
              totalCancel -= removed.amount;
              break;
            default:
              break;
          }

          timeDiff = (stack[0].time - trade.time) / 1000;
        }
      }

      switch (trade.type) {
        case 'D':
          totalBuy += trade.amount;
          break;
        case 'F':
          totalCancel += trade.amount;
          break;

        default:
          break;
      }
    }

    return totalBuy + totalCancel ? totalCancel / (totalBuy + totalCancel) > 1 / 3 : false;
  }
}
