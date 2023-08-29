import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { parseString } from 'xml2js'; // Import the parseString function

@Injectable()
export class BankingService {
  async fetchBankingAccounts(data: string): Promise<any> {
    return new Promise((resolve, reject) => {
    let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'https://api.haggaisecure.com/PrimeWebservice.asmx',
        headers: {
            'CF-Access-Client-Id': 'fc4be42beb0851db7661e97b6130f1f5.access',
            'CF-Access-Client-Secret': 'f56135503351eebec878cf3ea7097ab53b41208c5b04bd23c10d3462de6fef1f',
            'Content-Type': 'text/xml; charset=utf-8',
            'Accept': 'application/json',
            'Cookie': 'CF_Authorization=eyJraWQiOiIxZjYwODk3YzFlOWNhYWJlZTk3NWM0NzAyZmE3MGFlNzA1ZmM1Yzg1NTQzZTg2MWIwNTUwZTI3NzJlMzdkYTQxIiwiYWxnIjoiUlMyNTYiLCJ0eXAiOiJKV1QifQ.eyJ0eXBlIjoiYXBwIiwiYXVkIjoiYzI3ZGU2OTU1NTdjODY0OGVhMDU5OGI5NGJlNWNkYTA1ODZkOGQyMjNhMjkyYjMxYmRhNDdkMGViNzFiY2JjYiIsImV4cCI6MTY5MzEyNjY2NywiaXNzIjoiaHR0cHM6XC9cL2hhZ2dhaWJhbmsuY2xvdWRmbGFyZWFjY2Vzcy5jb20iLCJjb21tb25fbmFtZSI6ImZjNGJlNDJiZWIwODUxZGI3NjYxZTk3YjYxMzBmMWY1LmFjY2VzcyIsImlhdCI6MTY5MzA0MDI2Nywic3ViIjoiIn0.Rr21Awr2X0SAHBi81uzOiWWCYIwk6XlnyWxnSRAvpG7f-0FM-FuuKpQ6Uxka-j9IwMJDAe6eptkslG3hFIJUZJ6lMq8dDviWklIe--1B_f4B9_C5-nI8CA-_-OEhnF3VR4XrX5P66_M9L8FEJfrbLK53NaWQuort3GanPudK944urzngNY00ZUwpHc0ILLquQNnemPoM8lXqS0d-bfNwQurA8kbypPkvT6TV3xfBQOe2qjPOv7bYqzULUPJQXnyLZ11RThe4Nr7v9H50-aeaVo2wTjIPpbDdXho-YCyBLJ1LJIWrn8g5RAsDq7V0-bO1md6ZrwyPw3l4MyZtXQYlsg'
        },
        data: data
    };
      axios.request(config)
        .then((response) => {
            // Convert XML to JSON using xml2js
            parseString(response.data, (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    // Now result is a JSON object containing the XML data
                    const accountList = result['soap:Envelope']['soap:Body'][0]['AccountListAllResponse'][0]['AccountListAllResult'][0]['AccountListOutput'];
                    const processedData = accountList.map(account => {
                        return {
                            Retval: account.Retval[0].trim(),
                            Retmsg: account.Retmsg[0].trim(),
                            AccountNo: account.AccountNo[0].trim(),
                            Accounttitle: account.Accounttitle[0].trim(),
                            CustomerID: account.CustomerID[0].trim(),
                            OldAcctNo: account.OldAcctNo[0].trim(),
                            Product: account.Product[0].trim(),
                            Branch: account.Branch[0].trim(),
                            AcctStatus: account.AcctStatus[0].trim(),
                            Address: account.Address[0].trim(),
                            PhoneNo: account.PhoneNo[0].trim(),
                            BookBalance: account.BookBalance[0].trim(),
                            AvailableBalance: account.AvailableBalance[0].trim(),
                            UnclearBal: account.UnclearBal[0].trim(),
                            PendingChg: account.PendingChg[0].trim(),
                            Email: account.Email[0].trim()
                        };
                    });
                    resolve(processedData)
                }
            });
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
}
