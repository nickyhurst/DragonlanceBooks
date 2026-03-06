import { useMemo } from "react";
import DataTable from "react-data-table-component";
import { Badge } from "react-bootstrap";
import { truthyNumber, isComic } from "../utils/bookUtils";

export default function BookTable({ data, loading, onOpenImg }) {
  const columns = useMemo(
    () => [
      {
        name: "Image",
        width: "80px",
        cell: (row) => {
          if (!row?.Image) return null;
          const src = `/covers/${row.Image}`;

          return (
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                onOpenImg(src, row?.Title ? String(row.Title) : "Book cover");
              }}
            >
              <img
                src={src}
                alt={row?.Title ? String(row.Title) : "Book cover"}
                style={{ maxHeight: 70, borderRadius: 6 }}
                className="img-fluid"
                loading="lazy"
              />
            </a>
          );
        },
      },
      {
        name: "Title",
        sortable: true,
        grow: 2,
        selector: (row) => row?.Title ?? "",
        cell: (row) => {
          const collected = truthyNumber(row?.Collected);
          const hardCover = truthyNumber(row?.["Hard Cover"]);

          return (
            <div className="text-wrap">
              <div className="fs-5 fw-bold fst-italic">{row?.Title}</div>
              <div className="fw-light">
                {row?.Series ? `${row.Series} | ` : ""}
                {row?.Volume ? `${row.Volume} | ` : ""}
                {row?.Year ? String(row.Year) : ""}
              </div>

              <div className="mt-1 d-flex gap-2 flex-wrap">
                {collected && (
                  <Badge pill bg="success">
                    Collected
                  </Badge>
                )}
                {hardCover && (
                  <Badge pill bg="warning" text="dark">
                    Hardcover
                  </Badge>
                )}
                {isComic(row) && (
                  <Badge pill bg="info" className="text-dark">
                    Comic
                  </Badge>
                )}
              </div>
            </div>
          );
        },
      },
      { name: "Series", sortable: true, selector: (row) => row?.Series ?? "" },
      { name: "Volume", sortable: true, selector: (row) => row?.Volume ?? "" },
      { name: "Author", sortable: true, selector: (row) => row?.Author ?? "" },
      {
        name: "Year",
        sortable: true,
        rightAligned: true,
        selector: (row) => Number(row?.Year ?? 0),
      },
      {
        name: "Collected",
        sortable: true,
        selector: (row) => (truthyNumber(row?.Collected) ? 1 : 0),
        style: { justifyContent: "center" },
        cell: (row) =>
          truthyNumber(row?.Collected) ? (
            <i className="fa-solid fa-check text-success" />
          ) : (
            <i className="fa-solid fa-xmark text-danger" />
          ),
      },
      {
        name: "Hard Cover",
        sortable: true,
        style: { justifyContent: "center" },
        selector: (row) => (truthyNumber(row?.["Hard Cover"]) ? 1 : 0),
        cell: (row) =>
          truthyNumber(row?.["Hard Cover"]) ? <i className="fa-solid fa-book" /> : null,
      },
      { name: "Edition", sortable: true, selector: (row) => row?.Edition ?? "" },
      { name: "Version", sortable: true, selector: (row) => row?.Version ?? "" },
    ],
    [onOpenImg]
  );

  const rowStyles = [
    {
      when: (row) => truthyNumber(row?.Collected),
      style: { backgroundColor: "rgba(25, 135, 84, 0.18)" },
    },
  ];

  return (
    <DataTable
      columns={columns}
      data={data}
      progressPending={loading}
      pagination
      paginationPerPage={25}
      paginationRowsPerPageOptions={[10, 25, 50, 100]}
      conditionalRowStyles={rowStyles}
      highlightOnHover
      responsive
      dense
      customStyles={{
  table: {
    style: {
      backgroundColor: "transparent"
    }
  },
  headRow: {
    style: {
      backgroundColor: "#212529",
      color: "#fff",
      borderBottom: "1px solid #444"
    }
  },
  rows: {
    style: {
      color: "#fff",
      backgroundColor: "transparent"
    }
  },
  pagination: {
    style: {
      color: "#ddd",
      backgroundColor: "#1b1f23",
      borderTop: "1px solid #333"
    },
    pageButtonsStyle: {
      borderRadius: "6px",
      height: "32px",
      width: "32px",
      padding: "4px",
      margin: "2px",
      cursor: "pointer",
      transition: "all .15s ease",
      color: "#e4b74f",
      fill: "#e4b74f",
      backgroundColor: "transparent"
    }
  }
}}
    />
  );
}