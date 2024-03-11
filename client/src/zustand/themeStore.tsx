import create from 'zustand';
import {persist} from "zustand/middleware";

export const FigureThemes = {
   NEO: {
      bb: '/themes/pieces/Neo/bb.png',
      bk: '/themes/pieces/Neo/bk.png',
      bn: '/themes/pieces/Neo/bn.png',
      bq: '/themes/pieces/Neo/bq.png',
      br: '/themes/pieces/Neo/br.png',
      bp: '/themes/pieces/Neo/bp.png',
      wb: '/themes/pieces/Neo/wb.png',
      wk: '/themes/pieces/Neo/wk.png',
      wn: '/themes/pieces/Neo/wn.png',
      wq: '/themes/pieces/Neo/wq.png',
      wr: '/themes/pieces/Neo/wr.png',
      wp: '/themes/pieces/Neo/wp.png',
   },
   WOOD: {
      bb: '/themes/pieces/Wood/bb.png',
      bk: '/themes/pieces/Wood/bk.png',
      bn: '/themes/pieces/Wood/bn.png',
      bq: '/themes/pieces/Wood/bq.png',
      br: '/themes/pieces/Wood/br.png',
      bp: '/themes/pieces/Wood/bp.png',
      wb: '/themes/pieces/Wood/wb.png',
      wk: '/themes/pieces/Wood/wk.png',
      wn: '/themes/pieces/Wood/wn.png',
      wq: '/themes/pieces/Wood/wq.png',
      wr: '/themes/pieces/Wood/wr.png',
      wp: '/themes/pieces/Wood/wp.png',
   },
   ICYSEA: {
      bb: '/themes/pieces/IcySea/bb.png',
      bk: '/themes/pieces/IcySea/bk.png',
      bn: '/themes/pieces/IcySea/bn.png',
      bq: '/themes/pieces/IcySea/bq.png',
      br: '/themes/pieces/IcySea/br.png',
      bp: '/themes/pieces/IcySea/bp.png',
      wb: '/themes/pieces/IcySea/wb.png',
      wk: '/themes/pieces/IcySea/wk.png',
      wn: '/themes/pieces/IcySea/wn.png',
      wq: '/themes/pieces/IcySea/wq.png',
      wr: '/themes/pieces/IcySea/wr.png',
      wp: '/themes/pieces/IcySea/wp.png',
   },
   ALPHA: {
      bb: '/themes/pieces/Alpha/bb.png',
      bk: '/themes/pieces/Alpha/bk.png',
      bn: '/themes/pieces/Alpha/bn.png',
      bq: '/themes/pieces/Alpha/bq.png',
      br: '/themes/pieces/Alpha/br.png',
      bp: '/themes/pieces/Alpha/bp.png',
      wb: '/themes/pieces/Alpha/wb.png',
      wk: '/themes/pieces/Alpha/wk.png',
      wn: '/themes/pieces/Alpha/wn.png',
      wq: '/themes/pieces/Alpha/wq.png',
      wr: '/themes/pieces/Alpha/wr.png',
      wp: '/themes/pieces/Alpha/wp.png',
   },
   LUCA: {
      bb: '/themes/pieces/Luca/bb.png',
      bk: '/themes/pieces/Luca/bk.png',
      bn: '/themes/pieces/Luca/bn.png',
      bq: '/themes/pieces/Luca/bq.png',
      br: '/themes/pieces/Luca/br.png',
      bp: '/themes/pieces/Luca/bp.png',
      wb: '/themes/pieces/Luca/wb.png',
      wk: '/themes/pieces/Luca/wk.png',
      wn: '/themes/pieces/Luca/wn.png',
      wq: '/themes/pieces/Luca/wq.png',
      wr: '/themes/pieces/Luca/wr.png',
      wp: '/themes/pieces/Luca/wp.png',
   },
   MODERN: {
      bb: '/themes/pieces/Modern/bb.png',
      bk: '/themes/pieces/Modern/bk.png',
      bn: '/themes/pieces/Modern/bn.png',
      bq: '/themes/pieces/Modern/bq.png',
      br: '/themes/pieces/Modern/br.png',
      bp: '/themes/pieces/Modern/bp.png',
      wb: '/themes/pieces/Modern/wb.png',
      wk: '/themes/pieces/Modern/wk.png',
      wn: '/themes/pieces/Modern/wn.png',
      wq: '/themes/pieces/Modern/wq.png',
      wr: '/themes/pieces/Modern/wr.png',
      wp: '/themes/pieces/Modern/wp.png',
   },
   VINTAGE: {
      bb: '/themes/pieces/Vintage/bb.png',
      bk: '/themes/pieces/Vintage/bk.png',
      bn: '/themes/pieces/Vintage/bn.png',
      bq: '/themes/pieces/Vintage/bq.png',
      br: '/themes/pieces/Vintage/br.png',
      bp: '/themes/pieces/Vintage/bp.png',
      wb: '/themes/pieces/Vintage/wb.png',
      wk: '/themes/pieces/Vintage/wk.png',
      wn: '/themes/pieces/Vintage/wn.png',
      wq: '/themes/pieces/Vintage/wq.png',
      wr: '/themes/pieces/Vintage/wr.png',
      wp: '/themes/pieces/Vintage/wp.png',
   },
}
export const BoardThemes = {
   GREEN: {
      cellBlack: '#779954',
      cellWhite: '#E9EDCC',
      cellHighlight: '#BBCC44',
      cellAvailable: '#1c1a1a33'
   },
   DARKWOOD: {
      cellBlack: '#835835',
      cellWhite: '#C19E68',
      cellHighlight: '#CCA658',
      cellAvailable: '#1c1a1a33'
   },
   GLASS: {
      cellBlack: '#242B37',
      cellWhite: '#6C7585',
      cellHighlight: '#405E75',
      cellAvailable: '#ffffff59'
   },
   BROWN: {
      cellBlack: '#B88762',
      cellWhite: '#EDD6B0',
      cellHighlight: '#DCC34B',
      cellAvailable: '#1c1a1a33'
   },
   ICYSEA: {
      cellBlack: '#6E91A6',
      cellWhite: '#D4DFE5',
      cellHighlight: '#6DBBD2',
      cellAvailable: '#1c1a1a33'
   },
   OVERLAY: {
      cellBlack: '#7C7B79',
      cellWhite: '#9E9D9B',
      cellHighlight: '#7F9AAA',
      cellAvailable: '#ffffff59'
   },
   CHECKERS: {
      cellBlack: '#303030',
      cellWhite: '#C74C51',
      cellHighlight: '#95895D',
      cellAvailable: '#ffffff59'
   },
}

export interface BoardPayload {
   cellBlack: string;
   cellWhite: string;
   cellHighlight: string;
   cellAvailable: string;
   boardThemeName: string;
}

export interface FiguresPayload {
   bb: string;
   bk: string;
   bn: string;
   bq: string;
   br: string;
   bp: string;
   wb: string;
   wk: string;
   wn: string;
   wq: string;
   wr: string;
   wp: string;
   figuresThemeName: string;
}

interface ThemeStore {
   themeSettingsOpen: boolean;
   cellBlack: string;
   cellWhite: string;
   cellHighlight: string;
   cellAvailable: string;
   boardThemeName: string;
   playSounds: boolean;
   bb: string;
   bk: string;
   bn: string;
   bq: string;
   br: string;
   bp: string;
   wb: string;
   wk: string;
   wn: string;
   wq: string;
   wr: string;
   wp: string;
   figuresThemeName: string;
   pawnPromotion: string;
   setPlaySounds: (payload: boolean) => void;
   setPawnPromotion: (payload: string) => void;
   setBoard: (payload: BoardPayload) => void;
   setFigures: (payload: FiguresPayload) => void;
   setModal: (payload: boolean) => void;
   resetTheme: () => void;
}


// @ts-ignore
const useTheme = create<ThemeStore>(persist((set) => ({
   themeSettingsOpen: false,
   cellBlack: '#779952',
   cellWhite: '#edeed1',
   cellHighlight: '#ffff33',
   cellAvailable: '#1c1a1a33',
   pawnPromotion: 'q',
   boardThemeName: 'Green',
   playSounds: true,
   bb: '/themes/pieces/Neo/bb.png',
   bk: '/themes/pieces/Neo/bk.png',
   bn: '/themes/pieces/Neo/bn.png',
   bq: '/themes/pieces/Neo/bq.png',
   br: '/themes/pieces/Neo/br.png',
   bp: '/themes/pieces/Neo/bp.png',
   wb: '/themes/pieces/Neo/wb.png',
   wk: '/themes/pieces/Neo/wk.png',
   wn: '/themes/pieces/Neo/wn.png',
   wq: '/themes/pieces/Neo/wq.png',
   wr: '/themes/pieces/Neo/wr.png',
   wp: '/themes/pieces/Neo/wp.png',
   figuresThemeName: 'Neo',
   setModal: (payload: boolean) => {
      set({
         themeSettingsOpen: payload
      });
   },
   setBoard: (payload: BoardPayload) => {
      set({
         cellBlack: payload.cellBlack,
         cellWhite: payload.cellWhite,
         cellHighlight: payload.cellHighlight,
         cellAvailable: payload.cellAvailable,
         boardThemeName: payload.boardThemeName,
      });
   },
   setFigures: (payload: FiguresPayload) => {
      set({
         bb: payload.bb,
         bk: payload.bk,
         bn: payload.bn,
         bq: payload.bq,
         br: payload.br,
         bp: payload.bp,
         wb: payload.wb,
         wk: payload.wk,
         wn: payload.wn,
         wq: payload.wq,
         wr: payload.wr,
         wp: payload.wp,
         figuresThemeName: payload.figuresThemeName,
      });
   },
   setPawnPromotion: (payload: string) => {
      set({
         pawnPromotion: payload,
      });
   },
   setPlaySounds: (payload: boolean) => {
      set({
         playSounds: payload,
      });
   },
   resetTheme: () => {
      set({
         cellBlack: BoardThemes.GREEN.cellBlack,
         cellWhite: BoardThemes.GREEN.cellWhite,
         cellHighlight: BoardThemes.GREEN.cellHighlight,
         cellAvailable: BoardThemes.GREEN.cellAvailable,
         pawnPromotion: 'q',
         boardThemeName: 'Green',
         playSounds: true,
         bb: FigureThemes.NEO.bb,
         bk: FigureThemes.NEO.bk,
         bn: FigureThemes.NEO.bn,
         bq: FigureThemes.NEO.bq,
         br: FigureThemes.NEO.br,
         bp: FigureThemes.NEO.bp,
         wb: FigureThemes.NEO.wb,
         wk: FigureThemes.NEO.wk,
         wn: FigureThemes.NEO.wn,
         wq: FigureThemes.NEO.wq,
         wr: FigureThemes.NEO.wr,
         wp: FigureThemes.NEO.wp,
         figuresThemeName: 'Neo',
      });
   },
}), {
   name: 'themeSettings',
}));

export default useTheme;
