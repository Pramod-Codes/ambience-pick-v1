import { useEffect, useMemo, useState } from "react";
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

function getRequiredTableCapacity(guests: number): 2 | 4 | 6 | 8 | 10 {
  if (guests <= 2) return 2;
  if (guests <= 4) return 4;
  if (guests <= 6) return 6;
  if (guests <= 8) return 8;
  return 10;
}

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
  const byId = new Map(tables.map((table) => [table.id, table]));
  const renderTable = (id: number) => {
    const item = byId.get(id);
    if (!item) return null;
    return (
      <TableNode
        table={{
          ...item,
          status: selectedTable === item.id ? "selected" : item.status === "selected" ? "available" : item.status,
        }}
        recommended={recommendedIds.has(item.id)}
        onClick={() => onPick(item)}
      />
    );
  };

  if (zone === "bar") {
    return (
      <div className="grid grid-cols-[22px_34px_minmax(0,1fr)] items-start gap-x-3">
        <div className="row-span-3 h-[670px] rounded-l-full bg-muted-foreground/45" />
        <div className="grid grid-rows-9 gap-y-2 py-4">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((id) => <div key={id} className="h-14">{renderTable(id)}</div>)}
        </div>
        <div className="grid grid-cols-3 items-start gap-x-4 gap-y-7 pt-2">
          {[10, 11, 12, 13, 14, 15].map((id) => <div key={id}>{renderTable(id)}</div>)}
          <div className="col-span-3 grid grid-cols-2 gap-5 px-1">{[16, 17].map((id) => <div key={id}>{renderTable(id)}</div>)}</div>
          <div className="col-span-3 px-1">{renderTable(18)}</div>
        </div>
      </div>
    );
  }

  const ids = zone === "dining"
    ? [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    : [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
  return (
    <div className="grid grid-cols-3 items-center gap-x-5 gap-y-6">
      {ids.map((id) => {
        const item = byId.get(id);
        return <div key={id} className={item?.colSpan === 2 ? "col-span-2" : "col-span-1"}>{renderTable(id)}</div>;
      })}
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
  const requiredTableCapacity = getRequiredTableCapacity(requestedGuests);
  const recommendedIds = useMemo(() => {
    const available = tables.filter((table) => table.status === "available" || table.status === "selected");
    const fitting = available.filter((table) => table.capacity === requiredTableCapacity);
    const candidates = fitting;
    return new Set(candidates.map((table) => table.id));
  }, [tables, requiredTableCapacity]);

  const visibleTables = tables.filter((table) => table.capacity === requiredTableCapacity);

  useEffect(() => {
    if (selectedTable && !visibleTables.some((table) => table.id === selectedTable && table.status !== "reserved")) {
      setSelectedTable(null);
    }
  }, [requiredTableCapacity, zone]);

  if (!restaurant) return null;

  function pickTable(table: TableDef) {
    if (table.status === "reserved") return;
    setSelectedTable((current) => (current === table.id ? null : table.id));
  }

  const selected = visibleTables.find((table) => table.id === selectedTable && table.status !== "reserved");
  const selectedGuests = selected?.capacity ?? requiredTableCapacity;

  function handleReserve() {
    if (!selected) return;
    setDraftDetails(draft.date!, draft.time!, selected.capacity);
    setDraftTable(zone, selected.id);
    navigate(`/restaurant/${restaurant.id}/summary`);
  }

  return (
    <Shell noPadBottom>
      <PageHeader title="Select Table" />
      <SegmentTabs tabs={ZONES} active={zone} onChange={(value) => { setZone(value as DiningZone); setSelectedTable(null); }} />
      <div className="flex items-center gap-4 px-5 py-4 text-xs font-medium">
        <span className="flex items-center gap-2"><i className="h-4 w-4 rounded bg-primary" />Selected</span>
        <span className="flex items-center gap-2"><i className="h-4 w-4 rounded bg-muted-foreground/50" />Reserved</span>
        <span className="flex items-center gap-2"><i className="h-4 w-4 rounded bg-success" />Available</span>
        <span className="flex items-center gap-2"><i className="h-4 w-4 rounded bg-warning" />Recommended</span>
      </div>
      <div className="no-scrollbar flex-1 overflow-y-auto px-5 pb-24">
        <p className="mb-4 rounded-xl bg-primary/10 px-3 py-2 text-center text-xs font-medium text-primary">Select your table · Tables for {requiredTableCapacity} guests</p>
        {visibleTables.length ? <TableGrid tables={visibleTables} zone={zone} recommendedIds={recommendedIds} selectedTable={selectedTable} onPick={pickTable} /> : <div className="rounded-2xl bg-muted/60 px-5 py-10 text-center"><p className="font-heading text-base font-semibold">No tables available for {requiredTableCapacity} guests</p><p className="mt-1 text-sm text-muted-foreground">Try another time or change your guest count.</p><button onClick={() => navigate(`/restaurant/${restaurant.id}`)} className="mt-5 rounded-full border border-primary px-5 py-2.5 text-sm font-semibold text-primary">Change Time</button></div>}
      </div>
      <div className="absolute inset-x-0 bottom-0 bg-background px-5 pb-7 pt-3">
        <button onClick={handleReserve} disabled={!selected} className="w-full rounded-full bg-primary py-4 text-base font-semibold text-primary-foreground shadow-soft transition-transform active:scale-[0.98] disabled:opacity-40">
          {selected ? `Reserve Table • ${selectedGuests} Guests` : `Select a Table • ${requestedGuests} Guests`}
        </button>
      </div>
    </Shell>
  );
}
