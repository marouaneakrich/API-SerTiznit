--
-- PostgreSQL database dump
--

\restrict NP333hrenTb3T0cnhhiTVFSS41Df2J1CFBhJwncX0PsufpSvRQ0udiSQt1cbOX3

-- Dumped from database version 18.1
-- Dumped by pg_dump version 18.1

-- Started on 2025-11-20 15:01:34

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 220 (class 1259 OID 16391)
-- Name: artisans; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.artisans (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    phone character varying(50) NOT NULL,
    profession character varying(255) NOT NULL,
    experience_years integer DEFAULT 0,
    rating numeric(3,1) DEFAULT 0,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.artisans OWNER TO postgres;

--
-- TOC entry 219 (class 1259 OID 16390)
-- Name: artisans_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.artisans_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.artisans_id_seq OWNER TO postgres;

--
-- TOC entry 5017 (class 0 OID 0)
-- Dependencies: 219
-- Name: artisans_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.artisans_id_seq OWNED BY public.artisans.id;


--
-- TOC entry 4856 (class 2604 OID 16394)
-- Name: artisans id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.artisans ALTER COLUMN id SET DEFAULT nextval('public.artisans_id_seq'::regclass);


--
-- TOC entry 5011 (class 0 OID 16391)
-- Dependencies: 220
-- Data for Name: artisans; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.artisans (id, name, phone, profession, experience_years, rating, created_at, updated_at) FROM stdin;
1	Ali El Fassi	0612345678	Carpenter	5	4.5	2025-11-20 12:58:35.274504	2025-11-20 12:58:35.274504
2	Mohamed el malki	0712345678	Plumbers	5	4.0	2025-11-20 14:01:39.630003	2025-11-20 14:01:39.630003
5	Saad Chafik	0644556677	Air Conditioning Technician	6	4.5	2025-11-20 14:06:20.705876	2025-11-20 14:06:20.705876
6	Khalid Nouiri	0701122334	Mason	10	4.3	2025-11-20 14:06:27.075894	2025-11-20 14:06:27.075894
7	Rachid Ait Taleb	0633445566	Locksmith	3	4.1	2025-11-20 14:06:33.879502	2025-11-20 14:06:33.879502
8	Omar Bouzid	0622244466	Gardener	9	4.4	2025-11-20 14:06:41.728788	2025-11-20 14:06:41.728788
\.


--
-- TOC entry 5018 (class 0 OID 0)
-- Dependencies: 219
-- Name: artisans_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.artisans_id_seq', 8, true);


--
-- TOC entry 4862 (class 2606 OID 16406)
-- Name: artisans artisans_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.artisans
    ADD CONSTRAINT artisans_pkey PRIMARY KEY (id);


-- Completed on 2025-11-20 15:01:35

--
-- PostgreSQL database dump complete
--

\unrestrict NP333hrenTb3T0cnhhiTVFSS41Df2J1CFBhJwncX0PsufpSvRQ0udiSQt1cbOX3

