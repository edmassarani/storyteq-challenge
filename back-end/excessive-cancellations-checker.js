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

  }

  /**
   * Returns the total number of companies that are not involved in any excessive cancelling.
   * Note this should always resolve a number or throw error.
   */
  async totalNumberOfWellBehavedCompanies() {
    await this.parseFile();
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
          const amount = row[3];

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
new ExcessiveCancellationsChecker('./data/trades.csv').companiesInvolvedInExcessiveCancellations();
