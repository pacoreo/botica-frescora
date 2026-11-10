-- Botica Frescora · configuración de la base de datos en Supabase
-- Pega todo este texto en Supabase → SQL Editor → New query, y toca "Run".

create table if not exists public.fragancias (
  id text primary key,
  nombre text not null,
  lema text,
  emblema text,
  concentracion text,
  volumen text,
  ingredientes text,
  ref integer,
  actualizado timestamptz not null default now()
);

create table if not exists public.perfumes (
  id text primary key,
  marca text not null,
  nombre text not null,
  genero text default '',
  ref integer,
  actualizado timestamptz not null default now()
);

alter table public.fragancias enable row level security;
alter table public.perfumes enable row level security;

-- Solo las personas con cuenta (las que tú crees) pueden ver y editar el catálogo.
drop policy if exists "equipo lee fragancias" on public.fragancias;
drop policy if exists "equipo edita fragancias" on public.fragancias;
drop policy if exists "equipo lee perfumes" on public.perfumes;
drop policy if exists "equipo edita perfumes" on public.perfumes;
create policy "equipo lee fragancias" on public.fragancias for select to authenticated using (true);
create policy "equipo edita fragancias" on public.fragancias for all to authenticated using (true) with check (true);
create policy "equipo lee perfumes" on public.perfumes for select to authenticated using (true);
create policy "equipo edita perfumes" on public.perfumes for all to authenticated using (true) with check (true);

-- Fecha de última edición automática
create or replace function public.tocar_actualizado() returns trigger language plpgsql as $$
begin new.actualizado = now(); return new; end $$;
drop trigger if exists t_fragancias on public.fragancias;
drop trigger if exists t_perfumes on public.perfumes;
create trigger t_fragancias before update on public.fragancias for each row execute function public.tocar_actualizado();
create trigger t_perfumes before update on public.perfumes for each row execute function public.tocar_actualizado();
