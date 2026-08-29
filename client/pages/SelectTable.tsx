import { useMemo, useState } from "react";
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

function TableGrid({
  tables,
  zone,
  recommendedIds,
  selectedTable,
  onPick,
}: {
  tables: TableDef[];
  zone: DiningZone;
  recommendedIds: Set<number>;
  selectedTable: number | null;
  onPick: (table: TableDef) => void;
}) {
  const table = (item: TableDef) => (
    <TableNode
      table={{
        ...item,
        status: selectedTable === item.id ? "selected" : item.status === "selected" ? "available" : item.status,
      }}
      recommended={recommendedIds.has(item.id)}
      onClick={() => onPick(item)}
    />
  );

  if (zone === "bar") {
    const stools = tables.filter((item) => item.shape === "seat");
    const mainTables = tables.filter((item) => item.shape !== "seat");
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-3 gap-x-5 gap-y-3 rounded-2xl bg-muted/40 p-4">
          {stools.map((item) => <div key={item.id}>{table(item)}</div>)}
        </div>
        <div className="grid grid-cols-3 items-center gap-x-5 gap-y-6">
          {mainTables.map((item) => (
            <div key={item.id} className={item.colSpan === 3 ? "col-span-3" : "col-span-1"}>{table(item)}</div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-3 items-center gap-x-5 gap-y-7">
      {tables.map((item) => (
        <div key={item.id} className={item.colSpan === 2 ? "col-span-2" : "col-span-1"}>{table(item)}</div>
      ))}
    </div>
  );
}

export default function SelectTable() {
  const { id } = useParams();
  const navigate = useNavigate();
  const restaurant = id ? getRestaurant(id) : undefined;
  const { draft, setDraftTable, setDraftDetails } = useApp();
  const [zone, setZone] = useState<DiningZone>(draft.zone ?? "dining");
  const [selectedTable, setSelectedTable] = useState<number | null>(draft.tableId ?? null);

  const tables = restaurant?.tables[zone] ?? [];
  const requestedGuests = draft.guests;
  const recommendedIds = useMemo(() => {
    const available = tables.filter((table) => table.status === "available" || table.status === "selected");
    const fitting = available.filter((table) => table.seats >= requestedGuests);
    const candidates = fitting.length ? fitting : available;
    const closest = candidates.reduce((best, table) => Math.min(best, Math.abs(table.seats - requestedGuests)), Infinity);
    return new Set(candidates.filter((table) => Math.abs(table.seats - requestedGuests) === closest).map((table) => table.id));
  }, [tables, requestedGuests]);

  if (!restaurant) return null;

  function pickTable(table: TableDef) {
    if (table.status === "reserved") return;
    setSelectedTable((current) => (current === table.id ? null : table.id));
  }

  const selected = tables.find((table) => table.id === selectedTable);
  const selectedGuests = selected?.seats ?? requestedGuests;

  function handleReserve() {
    if (!selected) return;
    setDraftDetails(draft.date!, draft.time!, selected.seats);
    setDraftTable(zone, selected.id);
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
        <span className="flex items-center gap-2"><i className="h-4 w-4 rounded bg-primary" />Selected</span>
        <span className="flex items-center gap-2"><i className="h-4 w-4 rounded bg-muted-foreground/50" />Reserved</span>
        <span className="flex items-center gap-2"><i className="h-4 w-4 rounded bg-success" />Available</span>
        <span className="flex items-center gap-2"><i className="h-4 w-4 rounded bg-warning" />Recommended</span>
      </div>

      <div className="no-scrollbar flex-1 overflow-y-auto px-5 pb-24">
        <p className="mb-4 rounded-xl bg-primary/10 px-3 py-2 text-center text-xs font-medium text-primary">
          Tables highlighted in gold are best suited for {requestedGuests} guests
        </p>
        <TableGrid tables={tables} zone={zone} recommendedIds={recommendedIds} selectedTable={selectedTable} onPick={pickTable} />
      </div>

      <div className="absolute inset-x-0 bottom-0 bg-background px-5 pb-7 pt-3">
        <button
          onClick={handleReserve}
          disabled={!selected}
          className="w-full rounded-full bg-primary py-4 text-base font-semibold text-primary-foreground shadow-soft transition-transform active:scale-[0.98] disabled:opacity-40"
        >
          {selected ? `Reserve Table • ${selectedGuests} Guests` : `Select a Table • ${requestedGuests} Guests`}
        </button>
      </div>
    </Shell>
  );
}
