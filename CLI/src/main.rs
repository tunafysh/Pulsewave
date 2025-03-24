use std::process::exit;

use clap::{builder::{styling::{AnsiColor, Color, Style}, Styles}, command, Arg, ArgAction, ArgMatches};
use owo_colors::{OwoColorize, Stream};

pub fn args() -> ArgMatches {
    let styles = Styles::styled()
        .usage(Style::new().bold().underline().fg_color(Some(Color::Ansi(AnsiColor::Yellow))))
        .header(Style::new().bold().underline().fg_color(Some(Color::Ansi(AnsiColor::Yellow))))
        .literal(Style::new().fg_color(Some(Color::Ansi(AnsiColor::Green))))
        .invalid(Style::new().bold().fg_color(Some(Color::Ansi(AnsiColor::Red))))
        .error(Style::new().bold().fg_color(Some(Color::Ansi(AnsiColor::Red))))
        .valid(Style::new().bold().underline().fg_color(Some(Color::Ansi(AnsiColor::Green))))
        .placeholder(Style::new().fg_color(Some(Color::Ansi(AnsiColor::Magenta))));
    let cmd = command!()
        .styles(styles)
        .version(env!("CARGO_PKG_VERSION"))
        .arg(Arg::new("input-file")
            .short('f')
            .action(ArgAction::Set));
    cmd.get_matches()
}

fn main() {
    let args = args();
    let input_file = args.get_one::<String>("input-file");
    if input_file.is_none() {
        eprintln!("{}", " No file is provided ".if_supports_color(Stream::Stdout, |text| text.on_bright_red()).bold());
        exit(1);
    }
    
    let file = input_file.unwrap();
    let content = std::fs::read_to_string(file).unwrap();
    println!("{}", content);

}
