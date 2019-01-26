export default class Match{
	_id?: string;
	player1: string;
	player2: string;
	winner: string;
	time?: Date;
	rounds: { winner: string, hand: string }[];
}