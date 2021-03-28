import { parse } from "fast-html-parser";
import cheerio from "react-native-cheerio";

function request(url) {
  return fetch(url).then((res) => res.text());
}

function charts(type) {
  return request("https://finance.yahoo.com/" + type).then((body) => {
    const html = parse(body);
    const table = html
      .querySelector("#scr-res-table")
      .querySelectorAll("tr")
      .slice(1);

    const arr = [];
    table.forEach((x) => {
      const data = x.querySelectorAll("td");
      const t = data[0].querySelector("a").text;
      const n = data[0].querySelector("a").rawAttributes.title;
      const p = data[2].querySelector("span").text;
      const vc = data[3].querySelector("span").text;
      const pc = data[4].querySelector("span").text;
      const v = data[5].querySelector("span").text;

      arr.push({
        ticker: t,
        name: n,
        price: p,
        vchange: vc,
        pchange: pc,
        volume: v,
      });
    });
    
    return arr;
  });
}

function trending() {
  return request("https://ca.finance.yahoo.com/trending-tickers").then(
    (body) => {
      const $ = cheerio.load(body);
      const trending = [];
      $(".yfinlist-table")
        .children()
        .last()
        .children()
        .each((i, elem) => {
          const ticker = $(elem).children().first().text();
          const name = $(elem).children().eq(1).text();
          const price = $(elem).children().eq(2).text();
          const volume = $(elem).children().eq(6).text();
          const vchange = $(elem).children().eq(4).text();
          const pchange = $(elem).children().eq(5).text();

          trending[i] = {
            ticker,
            name,
            price,
            volume,
            vchange,
            pchange,
          };
        });

      return trending;
    }
  );
}

function search(ticker) {
  return request(
    "https://query1.finance.yahoo.com/v1/finance/search?q=" + ticker
  ).then((body) => {
    console.log(body);
    const data = JSON.parse(body);
    const quotes = data.quotes;
    const stocks = [];
    quotes.forEach((x) => {
      if (x.quoteType == "EQUITY") {
        stocks.push({
          ticker: x.symbol,
          name: x.shortname,
          exchange: x.exchange,
        });
      }
    });
    return stocks;
  });
}

function chart(ticker, interval) {
  const mappings = {
    2: { i: "2m", r: "1d" },
    5: { i: "15m", r: "5d" },
    15: { i: "30m", r: "1mo" },
    30: { i: "1d", r: "1y" },
    60: { i: "1mo", r: "max" },
  };

  const itr = mappings[interval].i;
  const rng = mappings[interval].r;

  return request(
    "https://query1.finance.yahoo.com/v8/finance/chart/" +
      ticker +
      "?interval=" +
      itr +
      "&range=" +
      rng
  ).then((body) => {
    const data = JSON.parse(body);
    return data.chart.result[0].indicators.quote[0].open;
  });
}

function quote(ticker) {
  return request(
    "https://query2.finance.yahoo.com/v7/finance/quote?symbols=" +
      ticker +
      "&formatted=true"
  ).then((body) => {
    const data = JSON.parse(body);
    const result = data.quoteResponse.result[0];
    const quote = {
      price: result.regularMarketPrice.fmt,
      high: result.regularMarketDayHigh.fmt,
      low: result.regularMarketDayLow.fmt,
      volume: result.regularMarketVolume.fmt,
      change: result.regularMarketChangePercent.fmt,
      changeAmount: result.regularMarketChange.fmt,
    };
    return quote;
  });
}

function news(ticker) {
  return request(
    ticker
      ? "https://ca.finance.yahoo.com/quote/" + ticker + "/news?p=" + ticker
      : "https://finance.yahoo.com/news"
  )
    .then((body) => {
      const uuids = body.indexOf("uuids");

      if (uuids == -1) {
        resolve([]);
      } else {
        body = body.substring(uuids + 8);

        const ids = [];

        try {
          for (var i = 0; i < 25; i++) {
            const end = body.indexOf(":");
            const uuid = body.substring(0, end);
            ids.push(uuid);
            const start = body.indexOf(",") + 1;
            body = body.substring(start);
          }
        } catch (error) {}
        return ids;
      }
    })
    .then((ids) =>
      request(
        "https://ca.finance.yahoo.com/caas/content/article/?uuid=" +
          ids.join(",") +
          "&appid=newsv2&bucket=HPMODALMAST100,FPSATE101,FPDOGFOOD202"
      ).then((body) => {
        try {
          const json = JSON.parse(body);
          const items = json.items;

          const arr = [];
          items.forEach((x) => {
            const data = x.data;
            const pdata = data.partnerData;
            const url = pdata.url;
            const title = pdata.title;
            const thumbnail = x.schema.default.thumbnailUrl;
            arr.push({
              snippet: title,
              link: url,
              img: thumbnail,
            });
          });
          return arr;
        } catch (error) {
          return [];
        }
      })
    );
}

module.exports = { charts, trending, search, chart, quote, news };
