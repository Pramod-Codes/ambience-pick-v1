import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Shell } from "@/components/Shell";
import { PageHeader } from "@/components/PageHeader";
import { SegmentTabs } from "@/components/PillTabs";
import { TableNode } from "@/components/TableNode";
import { getRestaurant } from "@/lib/mock-data";
import { DiningZone, TableDef } from "@/lib/types";
import { useApp } from "@/context/AppContext";

const ZONES: { value: DiningZone; label: string }[] = [
  { value: "dining", label: "Dining Area" },
  { value: "bar", label: "Bar" },
  { value: "terrace", label: "Terrace" },
];

const zoneLabel: Record<DiningZone, string> = {
  dining: "Dining Area",
  bar: "Bar",
  terrace: "Terrace",
};

export default function SelectTable() {
  const { id } = useParams();
  const navigate = useNavigate();
  const restaurant = id ? getRestaurant(id) : undefined;
  const { draft, setDraftTable } = useApp();
  const [zone, setZone] = useState<DiningZone>(draft.zone ?? "dining");
  const [selectedTable, setSelectedTable] = useState<number | null>(
    draft.tableId ?? null,
  );

  if (!restaurant) return null;

  const tables = restaurant.tables[zone];
  const displayedTables: TableDef[] = tables.map((table) => ({
    ...table,
    status:
      selectedTable === table.id
        ? "selected"
        : table.status === "selected"
          ? "available"
          : table.status,
  }));

  function pickTable(table: TableDef) {
    if (table.status === "reserved") return;
    setSelectedTable(table.id);
  }

  function handleReserve() {
    if (!selectedTable) return;
    setDraftTable(zone, selectedTable);
    navigate(`/restaurant/${restaurant.id}/summary`);
  }

  return (
    <Shell noPadBottom>
      <PageHeader title="Select Table" />
      <SegmentTabs
        tabs={ZONES}
        active={zone}
        onChange={(value) => {
          setZone(value as DiningZone);
          setSelectedTable(null);
        }}
      />

      <div className="flex items-center gap-4 px-5 py-4 text-xs font-medium">
        <span className="flex items-center gap-2">
          <i className="h-4 w-4 rounded bg-primary" />Selected
        </span>
        <span className="flex items-center gap-2">
          <i className="h-4 w-4 rounded bg-muted-foreground/50" />Reserved
        </span>
        <span className="flex items-center gap-2">
          <i className="h-4 w-4 rounded bg-success" />Available
        </span>
      </div>

      <div className="no-scrollbar flex-1 overflow-y-auto px-5 pb-24">
        {zone === "bar" ? (
          <div className="grid grid-cols-4 items-start gap-x-3 gap-y-4">
            <div className="col-span-1 row-span-4 mt-1 h-full min-h-[280px] rounded-l-full bg-muted-foreground/45" />
            {displayedTables.map((table) => (
              <div
                key={table.id}
                className={
                  table.shape === "seat"
                    ? "col-span-1"
                    : table.colSpan === 3
                      ? "col-span-3"
                      : "col-span-1"
                }
              >
                <TableNode table={table} onClick={() => pickTable(table)} />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-3 items-center gap-x-5 gap-y-5">
            {displayedTables.map((table) => (
              <div
                key={table.id}
                className={table.colSpan === 2 ? "col-span-2" : "col-span-1"}
              >
                <TableNode table={table} onClick={() => pickTable(table)} />
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="absolute inset-x-0 bottom-0 bg-background px-5 pb-7 pt-3">
        <button
          onClick={handleReserve}
          disabled={!selectedTable}
          className="w-full rounded-full bg-primary py-4 text-base font-semibold text-primary-foreground shadow-soft transition-transform active:scale-[0.98] disabled:opacity-40"
        >
          {selectedTable
            ? `Reserve Table • ${draft.guests} Guests`
            : `Select a Table • ${draft.guests} Guests`}
        </button>
      </div>
    </Shell>
  );
}

export { zoneLabel };
