import { Point } from './point';

export class Geofence {
    id: string;
    name: string;
    alert:string;
    fenceType: FenceType;
    areaType: AreaType;
    fencePolygon: Point[];
    fenceCenter: Point;
    radiusInMeters: number;
    assetIds: string[];
    tags: string[];
}

export enum FenceType {
    Inbound = <any>'Inbound',
    Outbound = <any>'Outbound'
}

export enum AreaType {
    Unknown = <any>'Unknown',
    Polygon = <any>'Polygon',
    Circular = <any>'Circular'
}