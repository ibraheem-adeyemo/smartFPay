import { tableUtils } from "../table.utils";

describe(`Table utilities`, () => {
  it(`return correct number of pages`, () => {
    expect(tableUtils.getNumberOfPages(10, 41)).toEqual(5);
  });
  it(`clean object`, () => {
    expect(tableUtils.cleanObject({ id: undefined, name: "Nimi" })).toEqual({
      name: "Nimi"
    });
  });
  it(`sorts data properly`, () => {
    const tableData = [
      { id: 1, name: "Nimi" },
      { id: 2, name: "Snr Nimi" },
      { id: 3, name: "Femi" }
    ];
    const sortedData = [
      { id: 3, name: "Femi" },
      { id: 1, name: "Nimi" },
      { id: 2, name: "Snr Nimi" }
    ];
    expect(tableUtils.sortData(tableData, { accessor: "name" }, "asc")).toEqual(
      sortedData
    );
  });
  it(`filter data properly`, () => {
    const tableData = [
      { id: 1, name: "Nimi" },
      { id: 2, name: "Snr Nimi" },
      { id: 3, name: "Femi" }
    ];
    const filteredData = [{ id: 1, name: "Nimi" }, { id: 2, name: "Snr Nimi" }];
    expect(tableUtils.filterData(tableData, { name: "nimi" })).toEqual(
      filteredData
    );
  });
  it(`creates Page Data`, () => {
    const tableData = [
      { id: 1, name: "Nimi" },
      { id: 2, name: "Snr Nimi" },
      { id: 3, name: "Femi" },
      { id: 4, name: "Nimi" },
      { id: 5, name: "Snr Nimi" },
      { id: 6, name: "Femi" },
      { id: 7, name: "Nimi" },
      { id: 8, name: "Snr Nimi" },
      { id: 9, name: "Femi" },
      { id: 10, name: "Nimi" },
      { id: 11, name: "Snr Nimi" },
      { id: 12, name: "Femi" }
    ];

    expect(tableUtils.createPageData(2, 10, tableData)).toEqual([
      { id: 11, name: "Snr Nimi" },
      { id: 12, name: "Femi" }
    ]);
  });
});
